import User from "../models/user.js";
import getCountryIso3 from "country-iso-2-to-3";
import redis from "redis";
import TransactionsModel from "../models/transactions.js";
import customers from "../models/customers.js";
import jwt from "jsonwebtoken";


const redisClient = redis.createClient({ host: "localhost", port: 6379 });

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { firstName: "", lastName: "", email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userFound = await user.findById(id);
//     res.status(200).json(userFound);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getCustomers = async (req, res) => {
  try {
    const customersData = await customers.find();

    res.status(200).json(customersData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const customerData = await customers.find();

    const mappedLocations = customerData.reduce((acc, { country_id }) => {
      const countryISO3 = getCountryIso3(country_id);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    });

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country_id, count]) => {
        return { id: country_id, value: count };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "desc" ? -1 : 1,
      };
      return sortFormatted;
    };

    const sortFormatted = sort ? generateSort() : {};

    const foundTransactions = await TransactionsModel.find({
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$price" },
              regex: new RegExp(search, "i"),
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$article_id" },
              regex: new RegExp(search, "i"),
            },
          },
        },
      ],
    })
      .sort(sortFormatted)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize, 10));

    const total = await TransactionsModel.countDocuments({
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$price" },
              regex: new RegExp(search, "i"),
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$article_id" },
              regex: new RegExp(search, "i"),
            },
          },
        },
      ],
    });

    res.status(200).json({ transactions: foundTransactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getYearlyOverview = async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          t_dat: { $toDate: "$t_dat" },
        },
      },
      {
        $addFields: {
          year: { $year: "$t_dat" },
          month: { $month: "$t_dat" },
        },
      },
      { $limit: 20000 }, // Add thi
    ];

    const yearlyOverview = await TransactionsModel.aggregate(pipeline);
    res.status(200).json(yearlyOverview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

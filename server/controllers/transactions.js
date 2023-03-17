// import TransactionsModel from "../models/transactions.js";

// export const getTransactions = async (req, res) => {
//   try {
//     const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

//     const generateSort = () => {
//       const sortParsed = JSON.parse(sort);
//       const sortFormatted = {
//         [sortParsed.field]: sortParsed.sort === "desc" ? -1 : 1,
//       };
//       return sortFormatted;
//     };

//     const sortFormatted = sort ? generateSort() : {};

//     const foundTransactions = await TransactionsModel.find({
//       $or: [
//         { price: { $regex: new RegExp(search, "i") } },
//         { article_id: { $regex: new RegExp(search, "i") } },
//       ],
//     })
//       .sort(sortFormatted)
//       .skip((page - 1) * pageSize)
//       .limit(parseInt(pageSize, 10));

//     const total = await TransactionsModel.countDocuments({
//       name: { $regex: new RegExp(search, "i") },
//     });

//     res.status(200).json({ transactions: foundTransactions, total });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };


    
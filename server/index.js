import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import articlesRoutes from "./routes/articles.js";
import managementRoutes from "./routes/management.js";
import generalRoutes from "./routes/general.js";
import customersRoutes from "./routes/customers.js";
import yearlyOverviewRoutes from "./routes/yearlyOverview.js";
//import router from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
//import authRoutes from "./routes/authRoutes.js";

// // Data imports //
// import user from "./models/user.js";
// import dataUser from "./data/index.js";
// import articles from "./models/articles.js";
// import ArticlesStatSchema from "./models/articles.js";
// import { getGeography } from "./controllers/general.js";
// import transactions from "./models/transactions.js";

/* Configuration */
dotenv.config();
const app = express();

/* Middleware */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

/* Routes */
app.use("/", generalRoutes); // Add this route
app.use("/articles", articlesRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/transactions", customersRoutes);
app.use("/customers", customersRoutes);
app.use("/yearlyOverview", yearlyOverviewRoutes);

/* Mongoose Setup */
const Port = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(Port, () => console.log(`Server running on port: ${Port}`));

    /* only add data one time */
    /* user.insertMany(dataUser) */
  })
  .catch((error) => console.log(error.message));

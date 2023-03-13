import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import articlesRoutes from './routes/articles.js';
import managementRoutes from './routes/management.js';
import generalRoutes from './routes/general.js';
import transactionsRoutes from './routes/transactions.js';
import morgan from 'morgan';
import customersRoutes from './routes/customers.js';


// Data imports //
import user from './models/user.js';
import dataUser from './data/index.js';
import articles from './models/articles.js';
import ArticlesStatSchema from './models/articles.js';
import { getGeography } from './controllers/general.js';


/* Configuratoin */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/articles", articlesRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/customers", customersRoutes);



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
 .catch((error) => console.log(error.message))

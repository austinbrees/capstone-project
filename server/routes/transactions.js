

import express from 'express';
const router = express.Router();
import { getTransactions } from '../controllers/transactions.js';

router.get("/transactions", getTransactions);

export default router;


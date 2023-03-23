import express from 'express';

import { getCustomers,
         getGeography,
         getTransactions,
         getdailyOverview } from '../controllers/general.js';

const router = express.Router();


router.get("/customers", getCustomers);
router.get("/geography", getGeography);
router.get("/transactions", getTransactions);
router.get("/dailyOverview", getdailyOverview);


export default router;

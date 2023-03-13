import express from 'express';

import { getCustomers,
         getGeography } from '../controllers/general.js';

const router = express.Router();


router.get("/customers", getCustomers);
router.get("/geography", getGeography);

export default router;

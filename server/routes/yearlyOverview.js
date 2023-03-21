import express from 'express';
import { getYearlyOverview } from '../controllers/general.js';

const router = express.Router();

router.get("/yearlyOverview", getYearlyOverview);

export default router;

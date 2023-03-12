import express from 'express';
const router = express.Router();
import { getArticles } from '../controllers/articles.js';

router.get("/articles", getArticles);

export default router;



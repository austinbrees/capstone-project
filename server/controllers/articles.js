import articles from '../models/articles.js'
import articlesStat from '../models/articlesStat.js'

export const getArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const articlesData = await articles.findPaginated(page, limit);
    res.status(200).json(articlesData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



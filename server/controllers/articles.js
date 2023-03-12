import articles from '../models/articles.js'
import articlesStat from '../models/articlesStat.js'

export const getArticles = async (req, res) => {
  try {
    const articlesData = await articles.find();

    res.status(200).json(articlesData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


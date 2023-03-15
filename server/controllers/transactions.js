import transactions from "../models/articlesStat.js";


export const getTransactions = async (req, res) => {
    try {
        const transactionsData = await transactions.find();
    
        res.status(200).json(customersData);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
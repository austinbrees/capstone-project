import mongoose from "mongoose";





const TransactionsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  t_dat: {
    type: Date,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  article_id: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sales_channel_id: {
    type: Number,
    required: true,
  },
});


const transactions = mongoose.model("transactions", TransactionsSchema);

export default transactions;

import mongoose from "mongoose";



const ArticlesStatSchema = new mongoose.Schema({
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


const articlesStat = mongoose.model("transactions", ArticlesStatSchema);

export default articlesStat;

import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true
  },
  FN: {
    type: String,
    default: ""
  },
  Active: {
    type: Number,
    default: 0
  },
  club_member_status: {
    type: String,
    required: true
  },
  fashion_news_frequency: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  postal_code: {
    type: String,
    required: true
  },
  country_id: {
    type: String,
    required: true
  }
});

const customers = mongoose.model("customers", customersSchema);

export default customers;




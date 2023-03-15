import mongoose from "mongoose";


const Articleschema = new mongoose.Schema({
    article_id: {
      type: Number,
      required: true,
      unique: true
    },
    product_code: {
      type: Number,
      required: true
    },
    prod_name: {
      type: String,
      required: true
    },
    product_type_no: {
      type: Number,
      required: true
    },
    product_type_name: {
      type: String,
      required: true
    },
    product_group_name: {
      type: String,
      required: true
    },
    graphical_appearance_no: {
      type: Number,
      required: true
    },
    graphical_appearance_name: {
      type: String,
      required: true
    },
    colour_group_code: {
      type: Number,
      required: true
    },
    colour_group_name: {
      type: String,
      required: true
    },
    perceived_colour_value_id: {
      type: Number,
      required: true
    },
    perceived_colour_value_name: {
      type: String,
      required: true
    },
    perceived_colour_master_id: {
      type: Number,
      required: true
    },
    perceived_colour_master_name: {
      type: String,
      required: true
    },
    department_no: {
      type: Number,
      required: true
    },
    department_name: {
      type: String,
      required: true
    },
    index_code: {
      type: String,
      required: true
    },
    index_name: {
      type: String,
      required: true
    },
    index_group_no: {
      type: Number,
      required: true
    },
    index_group_name: {
      type: String,
      required: true
    },
    section_no: {
      type: Number,
      required: true
    },
    section_name: {
      type: String,
      required: true
    },
    garment_group_no: {
      type: Number,
      required: true
    },
    garment_group_name: {
      type: String,
      required: true
    },
    detail_desc: {
      type: String,
      required: true
    }
  });
  
  Articleschema.statics.findPaginated = async function (page, limit) {
    const skip = (page - 1) * limit;
    const data = await this.find().skip(skip).limit(limit).exec();
    const count = await this.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);
  
    return {
      data,
      metadata: {
        page,
        limit,
        totalPages,
        count,
      },
    };
  };
  
  const articles = mongoose.model("articles", Articleschema);
  
  export default articles;
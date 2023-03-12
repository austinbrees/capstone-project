import mongoose from 'mongoose';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB database');
  const Article = mongoose.model('Article', {
    article_id: Number,
    product_code: Number,
    prod_name: String,
    product_type_no: Number,
    product_type_name: String,
    product_group_name: String,
    graphical_appearance_no: Number,
    graphical_appearance_name: String,
    colour_group_code: Number,
    colour_group_name: String,
    perceived_colour_value_id: Number,
    perceived_colour_value_name: String,
    perceived_colour_master_id: Number,
    perceived_colour_master_name: String,
    department_no: Number,
    department_name: String,
    index_code: String,
    index_name: String,
    index_group_no: Number,
    index_group_name: String,
    section_no: Number,
    section_name: String,
    garment_group_no: Number,
    garment_group_name: String,
    detail_desc: String
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB database', error);
});

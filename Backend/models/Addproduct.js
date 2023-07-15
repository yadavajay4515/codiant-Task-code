const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddproductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  name: {
    type: String,
  
  },
  price: {
    type: String,
    
    
  },
  weight: {
    type: String,
   
  },
  files: {
    type: String,
  
  },

});

const Product = mongoose.model("Productdata", AddproductSchema);
module.exports = Product;

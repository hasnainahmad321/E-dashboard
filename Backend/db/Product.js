const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
  },
  userId: {
    type: String,
  },
  company: {
    type: String,
  },
});
module.exports = mongoose.model("Product", ProductSchema);

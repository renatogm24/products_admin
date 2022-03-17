const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [6, "First name must be at least 6 characters long"],
  },
  price: { type: Number, required: [true, "Price is required"] },
  description: { type: String, required: [true, "Description is required"] },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

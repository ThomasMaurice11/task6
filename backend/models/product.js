var mongoose = require("mongoose");
var productSchema = mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);

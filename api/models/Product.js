const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // img: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() }
});

const Product = model('Product', ProductSchema);

module.exports = Product;
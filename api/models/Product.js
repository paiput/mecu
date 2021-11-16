const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  }
});

const Product = model('Product', ProductSchema);

module.exports = Product;
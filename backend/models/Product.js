const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },      // image URL or file path
    category: { type: String },
    sizes: [{ type: String }],    // e.g. ["S", "M", "L"]
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
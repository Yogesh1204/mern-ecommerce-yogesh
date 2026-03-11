const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  size: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },

    paymentMethod: { type: String, enum: ['COD', 'ONLINE'], default: 'COD' },
    paymentStatus: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    status: {
      type: String,
      enum: ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED',
    },

    totalAmount: { type: Number, required: true },
    items: [orderItemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
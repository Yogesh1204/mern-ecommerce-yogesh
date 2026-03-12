const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// POST /api/orders  -> place an order (COD)
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      paymentMethod,
      items,
      totalAmount,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      paymentMethod: paymentMethod || 'COD',
      totalAmount,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// GET /api/orders  -> list all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// PATCH /api/orders/:id/status  -> update order status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) {
      order.status = status; // PLACED, SHIPPED, DELIVERED, CANCELLED
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus; // PENDING, PAID
    }

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

// DELETE /api/orders/:id  -> delete an order (admin)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

module.exports = router;
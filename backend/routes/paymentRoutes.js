const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payments/razorpay/create-order
router.post('/razorpay/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // in rupees

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt: 'order_rcpt_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
});

// POST /api/payments/razorpay/verify
router.post('/razorpay/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Invalid Razorpay response' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Signature is valid → create order in DB as PAID
    const {
      customerName,
      customerEmail,
      customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      items,
      totalAmount,
    } = orderData;

    const dbOrder = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      paymentMethod: 'ONLINE',
      paymentStatus: 'PAID',
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

    res.json({ success: true, order: dbOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
});

module.exports = router;
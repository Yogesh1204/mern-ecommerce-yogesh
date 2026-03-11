import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'COD', // COD or ONLINE
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return <div style={{ padding: '20px' }}>Your cart is empty.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const placeCodOrder = async () => {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        paymentMethod: 'COD',
        items,
        totalAmount: getTotalPrice(),
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to place COD order');
    }

    const data = await res.json();
    clearCart();
    navigate('/orders', { state: { justPlacedId: data._id } });
  };

  const placeOnlineOrderWithRazorpay = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    // 1) Create Razorpay order on backend
    const res = await fetch(`${API_BASE_URL}/api/payments/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: getTotalPrice() }),
    });

    if (!res.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    const data = await res.json();

    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: 'Yogesh Store',
      description: 'Order payment',
      order_id: data.orderId,
      prefill: {
        name: form.customerName,
        email: form.customerEmail,
        contact: form.customerPhone,
      },
      theme: {
        color: '#1976d2',
      },
      handler: async function (response) {
        try {
          const verifyRes = await fetch(
            `${API_BASE_URL}/api/payments/razorpay/verify`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  ...form,
                  items,
                  totalAmount: getTotalPrice(),
                },
              }),
            }
          );

          if (!verifyRes.ok) {
            throw new Error('Payment verification failed');
          }

          const verifyData = await verifyRes.json();
          if (!verifyData.success) {
            throw new Error('Payment not successful');
          }

          clearCart();
          navigate('/orders', { state: { justPlacedId: verifyData.order._id } });
        } catch (err) {
          console.error(err);
          alert('Payment succeeded but order creation failed. Please contact support.');
        }
      },
      modal: {
        ondismiss: function () {
          // User closed Razorpay popup
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (form.paymentMethod === 'COD') {
        await placeCodOrder();
      } else {
        await placeOnlineOrderWithRazorpay();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Checkout</h1>
      <p>Total amount: ₹{getTotalPrice()}</p>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: '16px', display: 'grid', gap: '10px' }}
      >
        <input
          name="customerName"
          placeholder="Full name"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <input
          name="customerEmail"
          type="email"
          placeholder="Email (optional)"
          value={form.customerEmail}
          onChange={handleChange}
        />
        <input
          name="customerPhone"
          placeholder="Phone"
          value={form.customerPhone}
          onChange={handleChange}
          required
        />
        <input
          name="addressLine1"
          placeholder="Address line 1"
          value={form.addressLine1}
          onChange={handleChange}
          required
        />
        <input
          name="addressLine2"
          placeholder="Address line 2 (optional)"
          value={form.addressLine2}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
        />
        <input
          name="postalCode"
          placeholder="Pincode"
          value={form.postalCode}
          onChange={handleChange}
          required
        />

        <div>
          <p>Payment method:</p>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={form.paymentMethod === 'COD'}
              onChange={handleChange}
            />{' '}
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={form.paymentMethod === 'ONLINE'}
              onChange={handleChange}
            />{' '}
            Online (Razorpay)
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: '10px',
            padding: '10px 16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {submitting
            ? form.paymentMethod === 'COD'
              ? 'Placing COD order...'
              : 'Redirecting to Razorpay...'
            : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
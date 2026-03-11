import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading orders...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (orders.length === 0) return <div style={{ padding: '20px' }}>No orders yet.</div>;

  return (
    <div className="page-container">
      <h1>My Orders</h1>

      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Order ID:</strong> {order._id}
                <br />
                <strong>Name:</strong> {order.customerName}
                <br />
                <strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})
                <br />
                <strong>Status:</strong> {order.status}
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>Total:</strong> ₹{order.totalAmount}
                <br />
                <small>{new Date(order.createdAt).toLocaleString()}</small>
              </div>
            </div>

            <div style={{ marginTop: '8px' }}>
              {order.items.map((item) => (
                <div key={item._id} style={{ fontSize: '14px' }}>
                  • {item.name}
                  {item.size ? ` (size: ${item.size})` : ''} × {item.quantity} – ₹
                  {item.price * item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
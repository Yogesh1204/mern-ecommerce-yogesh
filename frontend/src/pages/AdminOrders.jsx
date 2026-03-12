import { useEffect, useState } from 'react';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const STATUS_OPTIONS = ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setSavingId(orderId);
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updated : o))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm('Delete this order?');
    if (!confirmDelete) return;

    try {
      setDeletingId(orderId);
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete order');

      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete order');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="page-container">Loading orders...</div>;
  if (error)
    return (
      <div className="page-container" style={{ color: 'red' }}>
        {error}
      </div>
    );
  if (orders.length === 0)
    return <div className="page-container">No orders yet.</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Admin – All Orders</h1>

      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Order ID
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Customer
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Total
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Payment
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Status
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Items
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td
                  style={{
                    borderBottom: '1px solid #eee',
                    padding: '8px',
                    fontSize: '12px',
                    maxWidth: '160px',
                    wordBreak: 'break-all',
                  }}
                >
                  {order._id}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  {order.customerName}
                  <br />
                  <small>{order.customerPhone}</small>
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  ₹{order.totalAmount}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  {order.paymentMethod} ({order.paymentStatus})
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={savingId === order._id}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td
                  style={{
                    borderBottom: '1px solid #eee',
                    padding: '8px',
                    fontSize: '12px',
                  }}
                >
                  {order.items.map((item) => (
                    <div key={item._id || item.name}>
                      • {item.name}
                      {item.size ? ` (size: ${item.size})` : ''} ×{' '}
                      {item.quantity}
                    </div>
                  ))}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  <button
                    onClick={() => handleDelete(order._id)}
                    disabled={deletingId === order._id}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #cc0000',
                      backgroundColor:
                        deletingId === order._id ? '#f5cccc' : '#ffffff',
                      color: '#cc0000',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    {deletingId === order._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return <div style={{ padding: '20px' }}>Your cart is empty.</div>;
  }

  return (
    <div className="page-container">
      <h1>Cart</h1>

      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item) => (
          <div
            key={item.productId + item.size}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '10px',
              backgroundColor: '#fff',
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              {item.size && <p style={{ margin: '4px 0', color: '#666' }}>Size: {item.size}</p>}
              <p style={{ margin: '4px 0' }}>Price: ₹{item.price}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.size, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.size, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            <p style={{ width: '80px', textAlign: 'right', margin: 0 }}>
              ₹{item.price * item.quantity}
            </p>

            <button
              onClick={() => removeFromCart(item.productId, item.size)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: 'red',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Total: ₹{getTotalPrice()}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={clearCart}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#1976d2',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
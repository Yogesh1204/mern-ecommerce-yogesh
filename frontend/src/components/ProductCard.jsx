import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        style={{
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '12px',
          backgroundColor: '#fff',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',   // square
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        )}
        <h3 style={{ marginTop: '10px', marginBottom: '4px' }}>{product.name}</h3>
        <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>{product.category}</p>
        <p style={{ fontWeight: 'bold', marginTop: '6px' }}>₹{product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
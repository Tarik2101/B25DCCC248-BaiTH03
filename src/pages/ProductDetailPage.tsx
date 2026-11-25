import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((item) => item.id === Number(id));

  if (status === 'loading') {
    return <div className="status-box">Đang tải thông tin sản phẩm...</div>;
  }

  if (status === 'failed') {
    return <div className="status-box error-text">Lỗi: {error}</div>;
  }

  if (!product) {
    return (
      <div className="status-box">
        <p style={{ marginBottom: '12px' }}>Không tìm thấy sản phẩm này.</p>
        <Link to="/" className="btn btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/" className="btn btn-outline">
          ← Quay lại danh sách
        </Link>
      </div>

      <div className="detail-card">
        <div className="detail-image-box">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => dispatch(addToCart(product))}
            >
              Thêm vào giỏ hàng
            </button>
            <Link to="/cart" className="btn btn-outline">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
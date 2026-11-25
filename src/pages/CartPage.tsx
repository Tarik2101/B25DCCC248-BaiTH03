import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (items.length === 0) {
    return (
      <div className="surface-box status-box">
        <h2 style={{ marginBottom: '12px' }}>Giỏ hàng của bạn đang trống</h2>
        <p style={{ marginBottom: '20px' }}>
          Hãy chọn thêm sản phẩm từ trang chủ để tiếp tục mua sắm.
        </p>
        <Link to="/" className="btn btn-primary">
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="page-header">
        <h1>Giỏ hàng ({totalQuantity} sản phẩm)</h1>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => dispatch(clearCart())}
        >
          Xóa toàn bộ giỏ
        </button>
      </div>

      <div className="surface-box">
        <div className="cart-list">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <div className="cart-item-info">
                <img src={product.image} alt={product.title} />
                <div>
                  <Link to={`/products/${product.id}`}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>
                      {product.title}
                    </h3>
                  </Link>
                  <p className="product-price" style={{ marginBottom: 0 }}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="qty-controls">
                <button
                  type="button"
                  className="qty-btn"
                  aria-label="Giảm số lượng"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: product.id,
                        quantity: quantity - 1,
                      })
                    )
                  }
                >
                  -
                </button>
                <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  className="qty-btn"
                  aria-label="Tăng số lượng"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: product.id,
                        quantity: quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <strong>${(product.price * quantity).toFixed(2)}</strong>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-bar">
          <div>
            <span style={{ color: 'var(--text-secondary)', marginRight: '8px' }}>
              Tổng cộng:
            </span>
            <strong style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>
              ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/" className="btn btn-outline">
              Tiếp tục mua hàng
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
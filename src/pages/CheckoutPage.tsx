import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  clearCart,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const { user } = useAuth();

  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="surface-box" style={{ maxWidth: '560px', margin: '24px auto' }}>
        <div className="success-banner">
          Đặt hàng thành công! Cảm ơn {user?.username} đã mua sắm tại ShopMini.
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Giỏ hàng của bạn đã được làm mới. Bạn có thể tiếp tục khám phá các sản phẩm khác.
        </p>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="surface-box status-box">
        <h2 style={{ marginBottom: '12px' }}>Không có sản phẩm để thanh toán</h2>
        <Link to="/" className="btn btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section style={{ maxWidth: '720px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Thanh toán đơn hàng</h1>

      <div className="surface-box">
        <p style={{ marginBottom: '16px' }}>
          Người nhận hàng: <strong>{user?.username}</strong>
        </p>

        <div className="cart-list">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <div>
                <strong>{product.title}</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Số lượng: {quantity} × ${product.price.toFixed(2)}
                </p>
              </div>
              <strong>${(product.price * quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        <div className="summary-bar">
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Tổng số lượng: {totalQuantity} sản phẩm
            </p>
            <strong style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>
              Thành tiền: ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePlaceOrder}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </section>
  );
}
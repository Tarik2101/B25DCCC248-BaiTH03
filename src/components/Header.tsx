import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalQuantity } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          ShopMini
        </Link>

        <nav className="nav-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/cart" className="cart-link">
            Giỏ hàng <span className="badge">{totalQuantity}</span>
          </Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-outline"
            aria-label="Đổi giao diện sáng tối"
          >
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          {user ? (
            <div className="user-info">
              <span className="username">Xin chào, {user.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
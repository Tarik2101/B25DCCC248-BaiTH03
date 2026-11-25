import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="surface-box status-box">
      <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '8px' }}>
        404
      </h1>
      <h2 style={{ marginBottom: '12px' }}>Không tìm thấy trang</h2>
      <p style={{ marginBottom: '20px' }}>
        Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.
      </p>
      <Link to="/" className="btn btn-primary">
        Quay về trang chủ
      </Link>
    </div>
  );
}
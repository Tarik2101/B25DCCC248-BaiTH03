import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <section>
      <div className="page-header">
        <h1>Danh sách sản phẩm</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm sản phẩm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {status === 'loading' && (
        <div className="status-box">Đang tải danh sách sản phẩm...</div>
      )}

      {status === 'failed' && (
        <div className="status-box">
          <p className="error-text">Lỗi: {error}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(fetchProducts())}
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length === 0 && (
        <div className="status-box">
          Không tìm thấy sản phẩm nào khớp với "{searchTerm}".
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
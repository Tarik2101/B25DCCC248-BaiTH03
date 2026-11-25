import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <div>
        <Link to={`/products/${product.id}`} className="product-image-wrap">
          <img src={product.image} alt={product.title} loading="lazy" />
        </Link>
        <p className="product-category">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>
        </Link>
      </div>

      <div>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-outline">
            Chi tiết
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary"
          >
            + Giỏ hàng
          </button>
        </div>
      </div>
    </article>
  );
}
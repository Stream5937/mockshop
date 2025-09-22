import { useOutletContext, Link, useParams } from "react-router-dom";
import style from "../styles/category.module.css";

export default function CategoryProducts() {
  const context = useOutletContext();
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  const [removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];

  const { categoryName } = useParams();

  const filtered = products.filter((p) => p.category === categoryName);

  if (filtered.length === 0) return <p>No products found in this category.</p>;

  return (
    <div>
      <h2>{categoryName}</h2>
      <div className={style.gridContainer}>
        {filtered.map((product) => (
          <div id={style.product} key={product.id}>
            <img
              id={style.imgCategory}
              src={product.image}
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <p>
              <b>${product.price}</b>
            </p>
            <p>{product.description.substring(0, 80)}...</p>
            <p>
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <Link to={`/product/${product.id}`}>View Product</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

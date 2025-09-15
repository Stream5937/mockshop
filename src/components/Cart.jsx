import { Link, useOutletContext } from "react-router-dom";
import style from "../styles/cart.module.css";

export default function Cart() {
  const context = useOutletContext();
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  console.log("cart: ", cart);
  const [removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  const [totalItems, setTotalItems] = context[4];

  return (
    <>
      <div className={style.cartContainer}>
        {/* Mini Cart */}

        <h2>🛒 Mini Cart (total items {totalItems})</h2>
        <div id={style.viewFull}>
          {cart.length > 0 && (
            <Link
              to="/cartPage"
              style={{ display: "block", marginTop: "0.5rem" }}
            >
              View Full Cart Page
            </Link>
          )}
        </div>

        {cart.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <ul
            id={style.cart_ul}
            style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}
          >
            {cart.map((obj) => (
              <li key={obj.item.id} style={{ marginBottom: "0.5rem" }}>
                <img
                  src={obj.item.image}
                  alt={obj.item.title}
                  style={{
                    verticalAlign: "middle",
                    objectFit: "contain",
                  }}
                />
                <span id={style.text} style={{ marginLeft: "0.5rem" }}>
                  {obj.item.title.substring(0, 20)}...
                  <span id={style.num}>(x{obj.number})</span>
                </span>
                <button
                  id={style.li_btn}
                  value={obj.item.id}
                  onClick={() => removeFromCart(obj.item.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

import { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import style from "../styles/cart.module.css";

export default function Cart() {
  const context = useOutletContext();
  //console.log("context: ", context);
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  console.log("cart: ", cart);
  const [addToCart, removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  //const [cartItem, setCartItem] = context[4];

  let totalItems = 0;

  //console.log("cart: ", cart, ":: ");

  useEffect(() => {
    // setCartItem({ item: product, number: quantity });
    //console.log("at cart : ", cartItem);
    //}, [cartItem, cart]);
  }, [cart]);

  // console.log("cartItem: ", cartItem, ":#: ");
  /*
  const initialValue = 0;
  totalItems = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.number,
    initialValue
  );
  console.log("totalItems: ", totalItems);
*/
  return (
    <>
      <div className={style.cartContainer}>
        {/* Mini Cart */}
        <div style={{ marginTop: "2rem" }}>
          <h2>🛒 Mini Cart ({totalItems})</h2>
          {cart.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {cart.map((obj) => (
                <li key={obj.item.id} style={{ marginBottom: "0.5rem" }}>
                  <img
                    src={obj.item.image}
                    alt={obj.item.title}
                    style={{
                      width: "30px",
                      verticalAlign: "middle",
                      objectFit: "contain",
                    }}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>
                    {obj.item.title.substring(0, 20)}... (x{obj.number})
                  </span>
                  <button
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
          {cart.length > 0 && (
            <Link
              to="/cartPage"
              style={{ display: "block", marginTop: "0.5rem" }}
            >
              View Full Cart
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

/*

for each:
              {cart.forEach((obj) => {
                <li key={obj.item.id} style={{ marginBottom: "0.5rem" }}>
                  <img
                    src={obj.item.image}
                    alt={obj.item.title}
                    style={{
                      width: "30px",
                      verticalAlign: "middle",
                      objectFit: "contain",
                    }}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>
           //         {/*   {item.title.substring(0, 20)}... (x{item.quantity}) 
                    item title here with quantity
                    {obj.item.title}
                    {obj.number}
                  </span>
                  <button
                    onClick={() => cart.removeFromCart(obj.item.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    ✖
                  </button>
                </li>;
              })}

*/

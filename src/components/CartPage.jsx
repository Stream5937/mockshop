import style from "../styles/cartPage.module.css";
import { Outlet, useOutletContext, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cart from "./Cart.jsx";
import IncDecBtn from "./incDecBtn.jsx";

export default function CartPage() {
  const context = useOutletContext();

  // console.log("at CartPage context: ", context);

  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  const [removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  const [totalItems, setTotalItems] = context[4];

  let totalNum = 0;
  cart.map((obj) => {
    totalNum = totalNum + Number(obj.number);
  });
  useEffect(() => {
    setTotalItems(totalNum);
  }, [totalNum]);

  const increase = (obj) => {
    console.log("id and +quntity: ", obj.item.id, ", ", obj.number);
    if (obj) {
      const newNumber = Number(obj.number) + 1;
      const newCartItem = { item: obj.item, number: newNumber };
      // check if product already in cart
      const exists = cart.find((c) => c.item.id === newCartItem.item.id);
      let updatedCart;
      if (exists) {
        updatedCart = cart.map((c) =>
          c.item.id === newCartItem.item.id ? newCartItem : c
        );
      } else {
        updatedCart = [...cart, newCartItem];
      }

      //   console.log("updatedCart: ", updatedCart);
      setCart(updatedCart);
      console.log("cart after update: ", updatedCart);
    } else {
      console.log("missing product!");
    }
  };
  const decrease = (obj) => {
    console.log("id and -quntity: ", obj.item.id, ", ", obj.number);
    if (obj) {
      let newNumber = Number(obj.number) - 1;
      if (newNumber < 1) {
        newNumber = 1;
      }

      const newCartItem = { item: obj.item, number: newNumber };
      // check if product already in cart
      const exists = cart.find((c) => c.item.id === newCartItem.item.id);
      let updatedCart;
      if (exists) {
        updatedCart = cart.map((c) =>
          c.item.id === newCartItem.item.id ? newCartItem : c
        );
      } else {
        updatedCart = [...cart, newCartItem];
      }

      //   console.log("updatedCart: ", updatedCart);
      setCart(updatedCart);
      console.log("cart after update: ", updatedCart);
    } else {
      console.log("missing product!");
    }
  };
  /*
  const navigate = useNavigate();
  console.log("**cart: ", cart);

  useEffect(() => {
    navigate("incDecBtn");
  }, []);

  */

  return (
    <>
      <div id={style.cartContainer}>
        <div id={style.products}>
          <h2 id={style.header}>MOCK SHOP CART DETAILS</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {cart.map((obj) => (
              <li key={obj.item.id} style={{ marginBottom: "0.5rem" }}>
                <div id={style.itemContainer}>
                  <div id={style.product}>
                    <h3>{obj.item.title}</h3>

                    <img
                      id={style.imgDetail}
                      src={obj.item.image}
                      alt={obj.item.title}
                    />
                    <div id={style.removebtn}>
                      <button
                        value={obj.item.id}
                        onClick={() => removeFromCart(obj.item.id)}
                        style={{
                          marginTop: "0.5rem",
                          width: "200px",
                        }}
                      >
                        <span id={style.remove}>Remove item</span> ✖
                      </button>
                    </div>
                  </div>

                  <div id={style.info}>
                    <p id={style.pricecat}>
                      <span id={style.price}>
                        <b>Price: ${obj.item.price}</b>
                      </span>
                      <span id={style.category}>
                        Category: {obj.item.category}
                      </span>
                    </p>
                    <p id={style.desc}>{obj.item.description}</p>

                    <div id={style.ratecount}>
                      <p>
                        ⭐ {obj.item.rating.rate} ({obj.item.rating.count}{" "}
                        reviews)
                      </p>
                      {/*
                      <div id={style.incdecbtn}>
                        <Outlet
                          context={[
                            obj,
                            [cart, setCart],
                            [removeFromCart, clearCart, sumCart],
                            [quantity, setQuantity],
                            [totalItems, setTotalItems],
                          ]}
                        />
                      </div>
                      */}
                      <div id={style.incbtn}>
                        <button
                          value={obj}
                          onClick={() => increase(obj)}
                          style={{
                            marginTop: "0.5rem",
                            width: "200px",
                          }}
                        >
                          <span id={style.inc}>Increase number</span> +
                        </button>
                      </div>
                      <div id={style.decbtn}>
                        <button
                          value={obj}
                          onClick={() => decrease(obj)}
                          style={{
                            marginTop: "0.5rem",
                            width: "200px",
                          }}
                        >
                          <span id={style.dec}>Decrease Number</span> -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id={style.cart}>
          <Cart />
        </div>
      </div>
    </>
  );
}

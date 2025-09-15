import { useState, useEffect } from "react";
import style from "../styles/incDecBtn.module.css";
import { useOutletContext } from "react-router";
//import { Link } from "react-router-dom";

export default function IncDecBtn() {
  const context = useOutletContext();
  const obj = context[0];
  // const { products, error, loading } = params[1];
  const [cart, setCart] = context[1];
  const currentObj = cart.find((c) => c.item.id === obj.item.id);
  const [currentQuantity, setCurrentQuantity] = useState(currentObj.number);

  /*
  console.log("obj: ", obj);
  console.log(
    "cart[0].item: ",
    cart[0].item,
    " cart[0].number ",
    cart[0].number
  );
  */
  // const [removeFromCart, clearCart, sumCart] = context[2];
  //const [quantity, setQuantity] = context[3];
  //console.log("quantity: ", quantity, " contxt[3] ", context[3]);
  // const [totalItems, setTotalItems] = context[4];

  // let currentQuantity;
  // const currentObj = cart.find((c) => c.item.id === obj.item.id);
  // if (currentObj) {
  //    setCurrentQuantity(currentObj.number);
  //  }

  const updateCart = () => {
    if (currentObj && currentQuantity) {
      const newCartItem = { item: currentObj.item, number: currentQuantity };
      console.log("newCartItem: ", newCartItem);

      // check if product already in cart
      const exists = cart.find((c) => c.item.id === newCartItem.item.id);
      console.log("Exists: ", exists);

      let updatedCart;
      if (exists) {
        console.log("exists so updating");
        updatedCart = cart.map((c) => {
          if (c.item.id === newCartItem.item.id) {
            c = newCartItem;
            console.log("c: ", c);
          } else {
            console.log("c: ", c);
          }
        });
        console.log("**updatedCart: ".updatedCart);
      } else {
        console.log("at else");
        updatedCart = [...cart, newCartItem];
      }
      console.log("updatedCart: ", updatedCart);

      setCart(updatedCart);
      console.log("cart after update: ", updatedCart);
    } else {
      console.log("missing product or quantity!");
    }
  };

  /*
  useEffect(() => {
    setQuantity(currentQuantity);
  }, []);
  */

  //  const [productCount, setProductCount] = useState(0);
  const increment = () => {
    // setCurrentQuantity((c) => c + 1);
    updateCart(+1);
  };
  const decrement = () => {
    setCurrentQuantity((c) => {
      c = c - 1;
      if (c < 0) {
        c = 0;
      }
      return c;
    });
    updateCart();
  };

  return (
    <>
      <div id={style.btncontainer}>
        <div id={style.inc}>
          <button onClick={increment}>
            <p>plus</p>
          </button>
        </div>
        <div id={style.count}>{currentQuantity}</div>
        <div id={style.dec}>
          <button onClick={decrement}>
            <p>minus</p>
          </button>
        </div>
      </div>
    </>
  );
}

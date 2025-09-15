import { useState, useEffect, useContext, useCallback } from "react";

import {
  Link,
  useParams,
  Outlet,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import style from "../styles/product.module.css";

export default function ProductDetail() {
  const { productId } = useParams();
  const context = useOutletContext();
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  const [removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  const [totalItems, setTotalItems] = context[4];

  //to clear input
  const [inputValue, setInputValue] = useState("");

  const product = products.find((p) => p.id === Number(productId));
  //const [totalItems, setTotalItems] = useState(0);

  let totalNum = 0;
  cart.map((obj) => {
    totalNum = totalNum + Number(obj.number);
  });
  useEffect(() => {
    setTotalItems(totalNum);
  }, [totalNum]);

  const navigate = useNavigate();
  useEffect(() => {
    navigate("cart");
  }, []);

  const handleQuantityChange = (e) => {
    e.preventDefault();
    console.log("updating quantity");
    setInputValue(e.target.value);
    setQuantity(e.target.value);
    console.log("quantity: ", quantity);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setQuantity();
    setInputValue("");
  };

  const updateCart = () => {
    if (product && quantity) {
      const newCartItem = { item: product, number: quantity };

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

      setCart(updatedCart);
      console.log("cart after update: ", updatedCart);
    } else {
      console.log("missing product or quantity!");
    }
  };

  //is this required to ensure re-render??
  //useEffect(() => {}, [cart]);

  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <div id={style.container}>
        <div id={style.productDetail}>
          <h3>PRODUCT DETAILS</h3>
          <div id={style.product}>
            <h2>{product.title}</h2>
            <img id={style.imgDetail} src={product.image} alt={product.title} />
            <p>
              <b>Price: ${product.price}</b>
            </p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <div id={style.actionbar}>
              <form onSubmit={onSubmitForm}>
                <input
                  style={style.input}
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Number to buy"
                  value={inputValue}
                  onChange={handleQuantityChange}
                />

                <button
                  type="submit"
                  value="Submit"
                  style={style.btnstyle}
                  onClick={updateCart}
                >
                  Update Cart
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id={style.sideCart}>
          <Outlet
            totalItems={totalItems}
            context={[
              products,
              [cart, setCart],
              [removeFromCart, clearCart, sumCart],
              [quantity, setQuantity],
              [totalItems, setTotalItems],
              {
                /*NB ADDED FROM THIS COMPONENET*/
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

/*
<h3>Cart Details</h3>
*/

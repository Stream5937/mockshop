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
  /*
  context={[
    { products, error, loading },
    [cart, setCart],
    [addToCart, removeFromCart, clearCart, sumCart],
    [quantity, setQuantity],
    [cartItem, setCartItem],
  ]}
    */
  const { productId } = useParams();
  const context = useOutletContext();
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  const [addToCart, removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  //  const [cartItem, setCartItem] = context[4];

  const product = products.find((p) => p.id === Number(productId));
  const navigate = useNavigate();

  useEffect(() => {
    navigate("cart");
  }, []);

  const handleQuantityChange = (e) => {
    e.preventDefault();
    console.log("updating quantity");
    setQuantity(e.target.value);
    console.log("quantity: ", quantity);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setQuantity();
  };

  /*
  const updateCart = () => {
    console.log("at updateCart: ");
    console.log("item: ", product);
    console.log("number: ", quantity);
    console.log("cart before update: ", cart);
    if (product && quantity) {
      setCartItem({ item: product, number: quantity });
      if (cartItem) {
        console.log("post setCartItem: cartItem.item: ", cartItem.item);
        //check if cart already includes product if so remove and add back with updated quantity
        if (cart.includes(cartItem.item)) {
          console.log("removing cartItem from cart: ", cart, " ", cartItem);
          removeFromCart(cartItem);
        }
        console.log("calling addToCart cartitem: ", cartItem);
        //now add new one as is current
        addToCart(cartItem);
        console.log("cart after update- addedToCart?: ", cart);
      }
    } else {
      console.log("missing product or quantity!");
    }
  };
*/
  //---------------------------------------------------------------------------------
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
  //---------------------------------------------------------------------------------

  useEffect(() => {
    // setCartItem({ item: product, number: quantity });
    // console.log("2-update to cart : ", cart);
    //}, [cartItem, cart]);
  }, [cart]);

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
                  onChange={handleQuantityChange}
                />

                <button
                  type="submit"
                  value="Submit"
                  style={style.btnstyle}
                  onClick={updateCart}
                >
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        </div>
        <div id={style.sideCart}>
          <h3>Cart Details</h3>
          <Outlet
            context={[
              products,
              [cart, setCart],
              [addToCart, removeFromCart, clearCart, sumCart],
              [quantity, setQuantity],
            ]}
          />
        </div>
      </div>
    </>
  );
}

/*
[cartItem, setCartItem],
*/

import style from "../styles/cartPage.module.css";
import { useOutletContext, Link, useParams } from "react-router-dom";

export default function CartPage() {
  const context = useOutletContext();
  //console.log("context: ", context);
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  const [addToCart, removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  //const [cartItem, setCartItem] = context[4];
  return (
    <>
      <div className={style.cartContainer}>
        <h2 id={style.header}>MOCK SHOP CART PAGE</h2>
        <div id={style.products}>Products in cart</div>
        <div id={style.cart}>cart</div>
      </div>
    </>
  );
}

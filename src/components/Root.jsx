import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts.jsx";
import style from "../styles/root.module.css";

export default function Root() {
  const proObj = useProducts();
  const { products, error, loading } = proObj;
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  //  const [cartItem, setCartItem] = useState({});
  /*
  const addToCart = (cartItem) => {
    console.log("Adding to cart: ", cart, " :: item : ", cartItem);
    //clone original cart to prev
    let prev = [...cart];
    setCartItem(prev.push(cartItem));
  };
  */ /*
  const addToCart = (cartItem) => {
    setCart((prev) => [...prev, cartItem]);
  };
  */ /*
  const removeFromCart = (cartItem) => {
    /*
    //cartItem defined
    if (Object.keys(cartItem).length !== 0) {
      // cart has items
      if (cart.length > 0) {
        let reducedCart = cart.filter((item) => {
          item !== cartItem;
        });
        let currentCart = [...reducedCart];
        setCart(currentCart);
      } else {
        console.log("Error: removing item from cart");
      }
    }
    */ /*
  };
  */
  //TEMP ONLY
  const addToCart = () => {};
  /*
  const removeFromCart = (e) => {
    console.log("e.target.value: ", e.target.value);
    let updatedCart;
    console.log("@Remove: cart: ", cart);
    updatedCart = cart.filter((obj) => {
      //console.log("obj.item.id: ", obj.item.id, " :: e:", e.target.value);
      obj.item.id !== e.target.value;
    });
    console.log("updatedCart: ", updatedCart);
    setCart(updatedCart);
  };
*/
  const removeFromCart = (id) => {
    //const id = Number(e.target.value); // convert string → number
    console.log("id to remove: ", id);
    console.log("cart: ", cart);
    // const newCart = cart.filter((p) => p.item.id !== Number(e.target.value));
    const newCart = cart.filter((p) => p.item.id !== id);
    console.log("newCart: ", newCart);
    setCart(newCart);
  };

  const clearCart = () => {
    let result = prompt("Confirm Delete Cart Contents", [false]);
    if (result) {
      setCart([]);
    }
  };

  const sumCart = () => {
    console.log("CartContents to sum: ", cart);
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //defines a new array from the set of unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <div className={style.container}>
        {/* Sidebar */}
        <div className={style.sidebar}>
          <h2>Categories</h2>
          <ul>
            <li>
              <Link to="/home">Home Page</Link>
            </li>
            <li>
              <Link to="/cartPage">Your Cart</Link>
            </li>
            {/*create a list of categories Links from the array */}
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`category/${encodeURIComponent(cat)}`}>{cat}</Link>
              </li>
            ))}
          </ul>
          <hr />
          {/* link back to root */}
          <Link to="/home">Clear Selection</Link>
        </div>
        {/* Detail panel */}
        <div className={style.detail}>
          <Outlet
            context={[
              { products, error, loading },
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

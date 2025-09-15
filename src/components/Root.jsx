import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts.jsx";
import style from "../styles/root.module.css";

export default function Root() {
  const proObj = useProducts();
  const { products, error, loading } = proObj;
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const removeFromCart = (id) => {
    //need to ensure id has been converted to a number from a string
    const newCart = cart.filter((p) => p.item.id !== id);
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
              [removeFromCart, clearCart, sumCart],
              [quantity, setQuantity],
              [totalItems, setTotalItems],
            ]}
          />
        </div>
      </div>
    </>
  );
}

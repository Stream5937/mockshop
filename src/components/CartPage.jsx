import style from "../styles/cartPage.module.css";
import { useOutletContext, Link, useParams } from "react-router-dom";
import Cart from "./Cart.jsx";
import IncDecBtn from "./incDecBtn.jsx";

export default function CartPage() {
  const context = useOutletContext();
  const { products, error, loading } = context[0];
  const [cart, setCart] = context[1];
  const [removeFromCart, clearCart, sumCart] = context[2];
  const [quantity, setQuantity] = context[3];
  const [totalItems, setTotalItems] = context[4];

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
                      <div id={style.incdecbtn}>
                        <IncDecBtn />
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
} /*}

/*
return (
    <>
      <div className={style.cartContainer}>
        <div id={style.products}>
          <h2 id={style.header}>MOCK SHOP CART DETAILS</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {cart.map((obj) => (
              <li key={obj.item.id} style={{ marginBottom: "0.5rem" }}>
                <div id={style.product}>
                  <h2>{obj.item.title}</h2>
                  <img
                    id={style.imgDetail}
                    src={obj.item.image}
                    alt={obj.item.title}
                  />
                </div>
                <div id={style.info}>
                  <p>
                    <b>Price: ${obj.item.price}</b>
                  </p>
                  <p>{obj.item.description}</p>
                  <p>Category: {obj.item.category}</p>
                  <p>
                    ⭐ {obj.item.rating.rate} ({obj.item.rating.count} reviews)
                  </p>
                </div>

                {/*
                <img
                  src={obj.item.image}
                  alt={obj.item.title}
                  style={{
                    width: "80px",
                    verticalAlign: "middle",
                    objectFit: "contain",
                  }}
                />
                <span style={{ marginLeft: "0.5rem" }}>
                  {obj.item.title.substring(0, 20)}... (x{obj.number})
                </span>
                */ /*
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
        </div>
        <div id={style.cart}>
          <Cart />
        </div>
      </div>
    </>
  );
*/

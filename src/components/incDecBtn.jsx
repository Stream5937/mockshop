import { useState } from "react";
import style from "../styles/incDecBtn.module.css";
import { useOutletContext } from "react-router";
//import { Link } from "react-router-dom";

export default function IncDecBtn() {
  //const context = useOutletContext();
  //const [productCount, setProductCount] = context;
  const [productCount, setProductCount] = useState(0);
  const increment = () => setProductCount((c) => c + 1);
  const decrement = () => setProductCount((c) => c - 1);

  return (
    <>
      <div id={style.btncontainer}>
        <div id={style.inc}>
          <button onClick={increment}>
            <p>plus</p>
          </button>
        </div>
        <div id={style.count}>{productCount}</div>
        <div id={style.dec}>
          <button onClick={decrement}>
            <p>minus</p>
          </button>
        </div>
      </div>
    </>
  );
}

import { useOutletContext, Link, useParams } from "react-router-dom";
import style from "../styles/home.module.css";

export default function Home() {
  const context = useOutletContext();
  console.log("context: ", context);
  const { products, error, loading } = context[0];
  console.log("products", products);

  //defines a new array from the set of unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  let copyCategories = [...categories];

  let initialProducts = products.map((p) => {
    if (copyCategories.includes(p.category)) {
      //remove category from copy arrray
      const index = copyCategories.indexOf(p.category);
      if (index > -1) {
        // only splice array when item is found
        copyCategories.splice(index, 1); // 2nd parameter means remove one item only
      }
      //return the product
      return p;
    }
  });

  initialProducts = initialProducts.filter((prod) => prod !== undefined);

  console.log("initial products: ", initialProducts);

  return (
    <>
      <h2>MOCK SHOP THIS WEEKS PROMOTIONS</h2>
      <div className={style.homeContainer}>
        {initialProducts.map((product) => (
          <div id={style.product} key={product.id}>
            <img id={style.imgHome} src={product.image} alt={product.title} />
            <h3>{product.title}</h3>

            <p>{product.description.substring(0, 80)}...</p>

            <Link to={`/product/${product.id}`}>View Product</Link>
          </div>
        ))}
      </div>
    </>
  );
}

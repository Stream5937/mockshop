import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import CategoryProducts from "./components/CategoryProducts.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Cart from "./components/Cart.jsx";
import CartPage from "./components/CartPage.jsx";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryProducts />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
      {
        path: "/cartPage",
        element: <CartPage />,
      },
    ],
  },
];

export default routes;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { uiActions } from "./store/ui-slice";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://react-http-4b88b-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "put", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("sending cart data to firebase failed");
      }

      const responeData = await response.json();
    };
  }, [cart]);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

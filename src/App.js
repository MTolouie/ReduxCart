import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "./store/Notification-store";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.cart.isVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const sendCartData = async () => {
      dispatch(
        notificationActions.showNotification({
          title: "pending",
          status: "pending",
          message: "Loading...",
        })
      );

      const respone = await fetch(
        "https://task-4792d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart.items),
        }
      );
      if (!respone.ok) {
        throw new Error("Request Was Not Successful");
      }
      dispatch(
        notificationActions.showNotification({
          title: "success",
          status: "success",
          message: "Request Was Successful",
        })
      );
    };

    sendCartData().catch((err) => {
      dispatch(
        notificationActions.showNotification({
          title: "error",
          status: "error",
          message: err.message,
        })
      );
    });
  }, [cart.items, dispatch]);

  return (
    <Fragment>
      {notification.title && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

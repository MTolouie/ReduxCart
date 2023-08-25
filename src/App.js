import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/Cart-slice";
let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.cart.isVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if(cart.isChanged){
      dispatch(sendCartData(cart.items));
    }

  }, [cart.items,cart.isChanged, dispatch]);

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

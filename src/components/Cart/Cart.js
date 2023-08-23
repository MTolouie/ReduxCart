import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  let content;

  if (cartItems.items !== null) {
    content = cartItems.map((item) => {
      return <CartItem key={item.id} item={item} />;
    });
  } else {
    content = <h2>No Items In The Cart</h2>;
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{content}</ul>
    </Card>
  );
};

export default Cart;

import classes from "./CartButton.module.css";
import { useDispatch,useSelector } from "react-redux";
import { cartActions } from "../../store/Cart-Store";
const CartButton = (props) => {
  
  const dispatch = useDispatch();
  
  const toggleCartVisibility = (event) => {
    dispatch(cartActions.toggleVisibility());
  };

  const cartItems = useSelector(state=>state.cart.items);

  const CartItemsCount = cartItems.reduce((curNumber, item) => {
    return curNumber + (+item.quantity);
  }, 0);

  return (
    <button onClick={toggleCartVisibility} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{CartItemsCount}</span>
    </button>
  );
};

export default CartButton;

import { createSlice } from "@reduxjs/toolkit";
import { notificationActions } from "./Notification-slice";
const cartInitialState = {
  isVisible: false,
  items: [],
  isChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
    },
    toggleVisibility(state) {
      state.isVisible = !state.isVisible;
    },
    addToCart(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      const existingItem = state.items[existingItemIndex];
      // const updatedTotalAmount = existingItem.total + (action.payload.price * action.payload.quantity );
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          total: existingItem.price * (existingItem.quantity + 1),
        };
        state.isChanged = true;
        state.items[existingItemIndex] = updatedItem;
      } else {
        const objToBeAdded = {
          ...action.payload,
          id: Math.random(),
          total: action.payload.price,
        };
        state.isChanged = true;
        state.items.push(objToBeAdded);
      }
    },
    increaseQuantity(state, action) {
      // const product = state.items.filter(
      //   (item) => item.title === action.payload.title
      // );
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );

      const updatedItem = {
        ...state.items[itemIndex],
        quantity: state.items[itemIndex].quantity + 1,
        total:
          state.items[itemIndex].price * (state.items[itemIndex].quantity + 1),
      };

      state.items[itemIndex] = updatedItem;
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );

      if (state.items[itemIndex].quantity === 1) {
        state.items = state.items.filter(
          (item) => item.title !== action.payload.title
        );
      } else {
        const updatedItem = {
          ...state.items[itemIndex],
          quantity: state.items[itemIndex].quantity - 1,
          total:
            state.items[itemIndex].price *
            (state.items[itemIndex].quantity + 1),
        };

        state.items[itemIndex] = updatedItem;
      }
    },
  },
});

export const sendCartData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        title: "pending",
        status: "pending",
        message: "Loading...",
      })
    );

    const sendRequest = async () => {
      const respone = await fetch(
        "https://task-4792d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartItems),
        }
      );

      if (!respone.ok) {
        throw new Error("Request Was Not Successful");
      }
    };

    try {
      await sendRequest();
      dispatch(
        notificationActions.showNotification({
          title: "success",
          status: "success",
          message: "Request Was Successful",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          title: "error",
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://task-4792d-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

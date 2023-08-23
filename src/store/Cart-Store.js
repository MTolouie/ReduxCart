import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  isVisible: false,
  items: [
   
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
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
        state.items[existingItemIndex] = updatedItem;
      } else {
        const objToBeAdded = {
          ...action.payload,
          id: Math.random(),
          total: action.payload.price,
        };
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

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

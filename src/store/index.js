import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart-Store";

const store = configureStore({
    reducer:{cart:cartReducer},
});


export default store;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart-slice";
import notificationReducer from "./Notification-slice";

const store = configureStore({
    reducer:{cart:cartReducer,notification:notificationReducer},
});


export default store;

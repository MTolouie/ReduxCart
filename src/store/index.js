import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart-Store";
import notificationReducer from "./Notification-store";

const store = configureStore({
    reducer:{cart:cartReducer,notification:notificationReducer},
});


export default store;

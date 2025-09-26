import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import booksReducer from "./slices/booksSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer,
  },
});

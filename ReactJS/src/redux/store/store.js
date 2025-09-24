import { configureStore } from "@reduxjs/toolkit";
import favouriteSlice from "./slices/favouriteSlice";

export default configureStore({
  reducer: {
    favourite: favouriteSlice,
  },
});

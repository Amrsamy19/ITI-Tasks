import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteList: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      state.favouriteList.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favouriteList = state.favouriteList.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;

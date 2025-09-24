import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteList: [],
    counter: 0,
  },
  reducers: {
    addFavourite: (state, action) => {
      state.favouriteList.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favouriteList = state.favouriteList.filter(
        (item) => item.id !== action.payload
      );
    },
    checkFavourite: (state, action) => {
      state.isFavourite = state.favouriteList.some(
        (item) => item.id === action.payload
      );
    },
    getCounter: (state) => {
      state.counter = state.favouriteList.length;
    },
  },
});

export const { addFavourite, removeFavourite, checkFavourite, getCounter } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;

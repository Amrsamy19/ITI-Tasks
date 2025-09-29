import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (cart, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/carts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          books: cart.books.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price * item.quantity,
            poster: item.poster,
            title: item.title,
          })),
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to add cart");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to fetch cart");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      books: [],
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.books.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        ++existingItem.quantity;
      } else {
        state.cart.books.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.books.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.books.find((item) => item._id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.books.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    updateQuantity: (state, action) => {
      const item = state.cart.books.find(
        (item) => item._id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCart.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

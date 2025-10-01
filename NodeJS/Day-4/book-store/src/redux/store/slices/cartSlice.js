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

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/carts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to delete cart");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartId, item }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/carts/${cartId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to update cart");
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
        state.message = action.payload.message;
        state.cart = action.payload.cart;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.cart = action.payload.cart;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.cart = { books: [] };
      })
      .addCase(deleteCart.rejected, (state, action) => {
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

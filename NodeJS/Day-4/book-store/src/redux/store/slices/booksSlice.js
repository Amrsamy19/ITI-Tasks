import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await fetch("http://localhost:3000/api/books");
  const data = await res.json();
  return data;
});

export const addNewBook = createAsyncThunk(
  "books/addNewBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to add book");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/books?q=${searchTerm}`
      );
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to search books");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/books/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to update book");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Failed to delete book");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    filtered: [],
    status: "idle",
    error: null,
    message: null,
  },
  reducers: {
    filterBooks: (state, action) => {
      if (action.payload === "all") {
        state.filtered = state.books;
      } else {
        state.filtered = state.books.filter(
          (book) => book.genre === action.payload
        );
      }
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.books = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.message = "Books found successfully!";
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.error = action.payload || "Failed to search books";
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.message = "Book added successfully!";
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.error = action.payload || "Failed to add book";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.message = "Book added successfully!";
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload || "Failed to add book";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b._id !== action.payload);
        state.message = "Book removed successfully!";
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove book";
      });
  },
});

export const { clearMessage, filterBooks } = booksSlice.actions;
export default booksSlice.reducer;

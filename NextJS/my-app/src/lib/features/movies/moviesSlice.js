import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example API: https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const res = await fetch("https://api.tvmaze.com/shows"); // example free API
  return await res.json();
});
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    return await res.json();
  }
);
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;

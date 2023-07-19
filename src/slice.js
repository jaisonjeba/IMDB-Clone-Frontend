import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:4000";

const initialState = {
  moviesList: [],
  isLoading: false,
  selectedMovie: {},
  error: "",
};
//get all movie

export const getMovieFromserver = createAsyncThunk(
  "movies/getMovieFromserver",
  async (_, rejectWithValue) => {
    const response = await fetch(`${baseUrl}/movies`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return rejectWithValue({ error: "No Movies Found" });
    }
  }
);

//get moviebyid
export const getMoviebyid = createAsyncThunk(
  "movies/getMoviebyid",
  async (id, rejectWithValue) => {
    const response = await fetch(`${baseUrl}/movies/${id}`);
    if (response.ok) {
      const movie = await response.json();
      return movie;
    } else {
      return rejectWithValue({ error: "No Movie Found" });
    }
  }
);
//update movie

export const updateMoviebyId = createAsyncThunk(
  "movies/updateMoviebyId",
  async ({ movie, id }, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const movie = await response.json();
      return movie;
    } else {
      return rejectWithValue({ error: "Something Went Wrong" });
    }
  }
);

//addmovie

export const addMovietoDb = createAsyncThunk(
  "movies/addMovietoDb",
  async (movie, rejectWithValue) => {
    const response = await fetch(`${baseUrl}/addmovie`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const movie = await response.json();
      return movie;
    } else {
      return rejectWithValue({ error: "Something Went Wrong" });
    }
  }
);

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMovieFromserver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieFromserver.fulfilled, (state, action) => {
        state.moviesList = action.payload;
        state.isLoading = false;
      })
      .addCase(getMovieFromserver.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(getMoviebyid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoviebyid.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
        state.isLoading = false;
      })
      .addCase(getMoviebyid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateMoviebyId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMoviebyId.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
        state.isLoading = false;
      })
      .addCase(updateMoviebyId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});
export default movieSlice.reducer;

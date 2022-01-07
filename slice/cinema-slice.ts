import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const fetchCinema = createAsyncThunk(
  "cinema/fetchCinema",
  async (dispatch) => {
    const { FETCH_URL } = process.env;

    let response = await fetch(`http://localhost:3000/api/movies`);
    // extract the data
    let movies = await response.json();

    return movies;
  }
);

const initialState = {
  loading: "",
  cinemaList: [],
};

export const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    Remove: (state, action) => {
      state.cinemaList = state.cinemaList.filter(
        (spc) => spc._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinema.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchCinema.fulfilled, (state, action) => {
        state.cinemaList = action.payload;
      });
  },
});

export const { Remove } = cinemaSlice.actions;

export const selectCinema = (state: RootState) => state.cinema;

export default cinemaSlice.reducer;

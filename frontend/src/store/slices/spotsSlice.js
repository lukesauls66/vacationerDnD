import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "../csrf";

const initialState = {
  spots: [],
  loading: false,
  errors: null,
};

export const getAll = createAsyncThunk(
  "spots/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await csrfFetch("/api/spots");
      const data = await res.json();
      console.log("data from thunk", data.Spots);
      return data.Spots;
    } catch (err) {
      return rejectWithValue(err.message || "No spots found");
    }
  }
);

const spotsSlice = createSlice({
  name: "spots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.spots = action.payload;
        console.log("state.spots", state.spots);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default spotsSlice.reducer;
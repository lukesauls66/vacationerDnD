import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "../csrf";

const initialState = {
  spots: null,
  currSpots: null,
  loading: false,
  errors: null,
};

export const getAll = createAsyncThunk(
  "spots/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await csrfFetch("/api/spots");
      const data = await res.json();
      return data.Spots;
    } catch (err) {
      return rejectWithValue(err.message || "No spots found");
    }
  }
);

export const getSpotById = createAsyncThunk(
  "spots/getSpotById",
  async (spotId, { rejectWithValue }) => {
    try {
      const res = await csrfFetch(`/api/spots/${spotId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "This spot could not be found");
    }
  }
);

// export const createASpot = createAsyncThunk(
//   "spots/createASpot",
//   async (
//     {
//       country,
//       address,
//       city,
//       state,
//       latitude,
//       longitude,
//       description,
//       name,
//       price,
//       previewImage,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await csrfFetch("/api/spots", {
//         method: "POST",
//         body: JSON.stringify({
//           country,
//           address,
//           city,
//           state,
//           latitude,
//           longitude,
//           description,
//           name,
//           price,
//           previewImage,
//         }),
//       });

//       const data = await res.json();
//       console.log("data:", data);
//       return data;
//     } catch (err) {
//       const errorData = await err.json();
//       const backendErrors = errorData.errors;
//       return rejectWithValue(backendErrors);
//     }
//   }
// );

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
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getSpotById.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getSpotById.fulfilled, (state, action) => {
        state.loading = false;
        state.currSpots = action.payload;
      })
      .addCase(getSpotById.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    // .addCase(createASpot.pending, (state) => {
    //   state.loading = true;
    //   state.errors = null;
    // })
    // .addCase(createASpot.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.spots = action.payload;
    // })
    // .addCase(createASpot.rejected, (state, action) => {
    //   state.loading = false;
    //   state.errors = action.payload;
    // });
  },
});

export default spotsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "../csrf";

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

export const login = createAsyncThunk(
  "session/login",
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const res = await csrfFetch("api/session/login", {
        method: "POST",
        body: JSON.stringify({ credential, password }),
      });
      const data = await res.json();
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const restoreUser = createAsyncThunk(
//   "session/restoreUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await csrfFetch("/api/session");
//       const data = await response.json();
//       return data.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload.errors;
      });
    // .addCase(restoreUser.pending, (state) => {
    //   state.loading = true;
    //   state.errors = null;
    // })
    // .addCase(restoreUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    // })
    // .addCase(restoreUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.errors = action.payload.errors || "Failed to restore session";
    // });
  },
});

export const { logoutUser } = sessionSlice.actions;
export default sessionSlice.reducer;

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
      const res = await csrfFetch("/api/session/login", {
        method: "POST",
        body: JSON.stringify({ credential, password }),
      });
      const data = await res.json();
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed.");
    }
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      await csrfFetch("/api/session", {
        method: "DELETE",
      });
      return;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed.");
    }
  }
);

export const signup = createAsyncThunk(
  "session/signup",
  async (
    { username, firstName, lastName, email, password },
    { rejectWithValue }
  ) => {
    try {
      const res = await csrfFetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();
      return data.user;
    } catch (error) {
      const errorData = await error.json();
      const backendErrors = errorData.errors;
      return rejectWithValue(backendErrors);
    }
  }
);

export const restoreUser = createAsyncThunk(
  "session/restoreUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await csrfFetch("/api/session");
      const data = await res.json();
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Restore user failed.");
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = null;
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
        state.errors = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(restoreUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { resetErrors } = sessionSlice.actions;
export default sessionSlice.reducer;

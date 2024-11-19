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
      const data = res.json();
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Signup failed.");
    }
  }
);

// csrfFetch('/api/users/signup', {
//   method: 'POST',
//   body: JSON.stringify({ username: "padams", firstName: "Patrick", lastName: "Adams", email: "p.adams@gmail.com", password: "password88" })
// }).then(res => res.json()).then(data => console.log(data));

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
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
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Clear the user from Redux state
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload.errors;
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
        state.errors = action.payload.errors;
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
        state.errors = action.payload.errors;
      });
  },
});

export default sessionSlice.reducer;
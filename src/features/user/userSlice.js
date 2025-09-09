import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, fetchUser } from "./userAPI";

export const register = createAsyncThunk("user/register", async (userData) => {
  return await registerUser(userData);
});

export const login = createAsyncThunk("user/login", async (userData) => {
  return await loginUser(userData);
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  return await fetchUser();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
    accessToken: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      state.accessToken = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.accessToken = action.payload.access_token;
        localStorage.setItem("access_token", action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.accessToken = action.payload.access_token;
        localStorage.setItem("access_token", action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => { state.loading = true; })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

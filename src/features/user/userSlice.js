import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, fetchUser, updateUserProfile, getAllIndustries, getAllRoles , getAllEducationLevels } from "./userAPI";
import { REHYDRATE } from 'redux-persist';



export const register = createAsyncThunk("user/register", async (userData) => {
  return await registerUser(userData);
});

export const login = createAsyncThunk("user/login", async (userData) => {
  return await loginUser(userData);
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  return await fetchUser();
});

export const updateUserPro = createAsyncThunk("user/updateUserProfile", async (userData) => {
  return await updateUserProfile(userData);
});

export const getIndustries = createAsyncThunk("user/getIndustries", async () => {
  return await getAllIndustries();
});

export const getRoles = createAsyncThunk("user/getRoles", async () => {
  return await getAllRoles();
});

export const getEducationLevels = createAsyncThunk("user/getEducationLevels", async () => {
  return await getAllEducationLevels();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    industries: [],
    roles: [],
    educationLevels: [],
    loading: false,
    bootstrapping: false,
    error: null,
    accessToken: null,
    success: "",
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
        // The error payload is already formatted by the API
        state.error = action.error.message || 'Registration failed. Please try again.';
        // Re-throw the error to be caught by the component
        throw action.error;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors when starting a new login attempt
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.user;
        state.accessToken = action.payload.access_token;
        localStorage.setItem("access_token", action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // The error payload is already formatted by the API
        state.error = action.error?.message || 'Login failed. Please check your credentials and try again.';
        // Don't re-throw the error here as it's already handled in the component
      })
      .addCase(getUser.pending, (state) => { state.bootstrapping = true; })
      .addCase(getUser.fulfilled, (state, action) => {
        state.bootstrapping = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.bootstrapping = false;
        state.error = action.error.message;
      })
      .addCase(getIndustries.pending, (state) => { state.loading = true; })
      .addCase(getIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(getIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRoles.pending, (state) => { state.loading = true; })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEducationLevels.pending, (state) => { state.loading = true; })
      .addCase(getEducationLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.educationLevels = action.payload;
      })
      .addCase(getEducationLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserPro.pending, (state) => { state.loading = true; })
      .addCase(updateUserPro.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Profile updated successfully";
      })
      .addCase(updateUserPro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(REHYDRATE, (state) => {
        state.loading = false;
        state.bootstrapping = false;
        state.error = null;
        state.success = "";
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

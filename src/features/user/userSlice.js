import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, fetchUser, updateUserProfile, getAllIndustries, getAllRoles , getAllEducationLevels } from "./userAPI";

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
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

import axios from "../../api/axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post("/register", userData);
    return response.data;
  } catch (error) {
    // This will be caught by createAsyncThunk's rejected action
    throw error.response?.data || { message: 'Registration failed. Please try again.' };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post("/login", userData);
    return response.data;
  } catch (error) {
    // This will be caught by createAsyncThunk's rejected action
    throw error.response?.data || { message: 'Login failed. Please try again.' };
  }
};

export const fetchUser = async () => {
  const response = await axios.get("/user"); // e.g. /me endpoint
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await axios.post("/upload-profile", userData);
  return response.data;
};

export const getAllIndustries = async () => {
  const response = await axios.get("/get-industries");
  return response.data;
};

export const getAllRoles = async () => {
  const response = await axios.get("/get-roles");
  return response.data;
};

export const getAllEducationLevels = async () => {
  const response = await axios.get("/get-education-levels");
  return response.data;
};

export const getAllUserCompletedSteps = async () => {
  const response = await axios.get("/completed-steps");
  return response.data;
};

export const updateUserCompletedSteps = async (formData) => {
  const response = await axios.post('/update-steps', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}
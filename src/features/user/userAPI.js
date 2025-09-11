import axios from "../../api/axios";

export const registerUser = async (userData) => {
  const response = await axios.post("/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post("/login", userData);
  return response.data;
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
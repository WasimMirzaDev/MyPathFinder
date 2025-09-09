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

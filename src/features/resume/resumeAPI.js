import axios from "../../api/axios";

export const fetchInterviewUserHistory = async () => {
  const response = await axios.get("/interview/history"); // e.g. /me endpoint
  console.log("request hit",response.data);
  return response.data;
};

import axios from "../../api/axios";

export const fetchInterviewUserHistory = async () => {
  const response = await axios.get("/interview/history"); // e.g. /me endpoint
  console.log("request hit",response.data);
  return response.data;
};



export const createEmptyUserResume = async (emptyResume) => {
  const response = await axios.post("/v1/resume/create-empty", { newEmptyResume : emptyResume});
  return response.data;
};


export const fetchUserResumeById = async (id) => {
  const response = await axios.get("/v1/resume-by-id/"+id);
  return response.data;
};

export const updateUserResumeById = async ({id , parsedResume}) => {
  const response = await axios.put("/v1/resume/"+id , {cv_resumejson : parsedResume});
  return response.data;
}


export const uploadExistingUserResume = async (formData) => {
  const response = await axios.post("/parse-resume", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data) => data, // Prevent axios from transforming the FormData
  });
  return response.data;
}
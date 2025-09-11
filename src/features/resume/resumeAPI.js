import axios from "../../api/axios";

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


export const generateUserCvAi = async (formData) => {
  const response = await axios.post("/generate-cv-ai", formData);
  return response.data;
}


export const analyzeUserSummaryAi = async (formData) => {
  const response = await axios.post("/analyze-paragraph", formData);
  return response.data;
}

export const generateUserCoverLetter = async (formData) =>{
  const response = await axios.post("/generate-cover-letter", formData);
  return response.data;
}
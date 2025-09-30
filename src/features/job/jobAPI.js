import axios from "../../api/axios";

export const fetchUserJobs = async (formData) => {
  const response = await axios.get(`/fetch-jobs?q=${encodeURIComponent(
    formData.searchQuery + " job"
        )}&gl=${formData.country}&location=${encodeURIComponent(formData.location)}`); // e.g. /me endpoint
//   console.log("request hit",response.data);
  return response.data;
};

export const UserJobAppliedCreate = async (formData) => {
  const response = await axios.post('/apply-job', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

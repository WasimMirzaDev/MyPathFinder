import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserJobs , UserJobAppliedCreate } from "./jobAPI";


export const fetchJobs = createAsyncThunk("fetch/jobs", async (formData) => {
  return await fetchUserJobs(formData);
});

export const JobAppliedCreate = createAsyncThunk("create/jobs", async (formData) => {
  return await UserJobAppliedCreate(formData);
});

const jobSlice = createSlice({
    name: "job",
    initialState: {
      jobs: null,
      filteredJobs:null,
      appliedJobs:null,
      loading: false,
      error: null,
    },
    reducers: {
        setfilteredJobs: (state, action) => {
            state.filteredJobs = action.payload
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchJobs.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchJobs.fulfilled, (state, action) => {
          state.loading = false;
            const jobsWithSalary = (action.payload.jobs || []).map(job => {
              const salaryInfo = (action.payload.data?.jobs || []).find(
                  j => j.job_id === job.job_id
                )?.salary_data;
                
                return {
              ...job,
              job_min_salary: salaryInfo?.min_amount || 0,
              job_max_salary: salaryInfo?.max_amount || 0,
              job_salary_currency: salaryInfo?.currency || 'GBP',
              job_salary_period: salaryInfo?.period || 'year'
              };
            });
           state.jobs = jobsWithSalary;
           state.filteredJobs = jobsWithSalary;
        })
        .addCase(fetchJobs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(JobAppliedCreate.pending, (state) => {
          state.loading = true;
        })
        .addCase(JobAppliedCreate.fulfilled, (state, action) => {
          state.loading = false;
          state.appliedJobs = action.payload;
        })
        .addCase(JobAppliedCreate.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
  });
  

export const { setfilteredJobs } = jobSlice.actions;
export default jobSlice.reducer;

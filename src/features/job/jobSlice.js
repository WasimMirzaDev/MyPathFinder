import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserJobs , UserJobAppliedCreate , fetchUserAppliedJobs , UserJobAppliedUpdate} from "./jobAPI";


export const fetchJobs = createAsyncThunk("fetch/jobs", async (formData) => {
  return await fetchUserJobs(formData);
});

export const JobAppliedCreate = createAsyncThunk("create/jobs", async (formData) => {
  return await UserJobAppliedCreate(formData);
});

export const fetchAppliedJobs = createAsyncThunk("fetch/applied-jobs", async () => {
  return await fetchUserAppliedJobs();
});
export const updateAppliedJob = createAsyncThunk(
  "jobs/updateAppliedJob",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const data = await UserJobAppliedUpdate(id, updates);

      // 🔑 Force the payload into a plain predictable object
      return { id, updates: data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




const jobSlice = createSlice({
    name: "job",
    initialState: {
      jobs: null,
      filteredJobs:null,
      appliedJobs:[],
      loading: false,
      error: null,
    },
    reducers: {
        setfilteredJobs: (state, action) => {
            state.filteredJobs = action.payload
        },
        setAppliedJobs: (state, action) => {
          state.appliedJobs = action.payload
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
        .addCase(fetchAppliedJobs.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
          state.loading = false;
          state.appliedJobs = action.payload;
        })
        .addCase(fetchAppliedJobs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateAppliedJob.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateAppliedJob.fulfilled, (state, action) => {
          state.loading = false;
          const { id, updates } = action.payload;
        
          if (Array.isArray(state.appliedJobs)) {
            state.appliedJobs = state.appliedJobs.map(job =>
              job.id === id ? { ...job, ...updates } : job
            );
          } else if (Array.isArray(state.appliedJobs?.data)) {
            state.appliedJobs.data = state.appliedJobs.data.map(job =>
              job.id === id ? { ...job, ...updates } : job
            );
          }
        })        
        .addCase(updateAppliedJob.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update job application';
        });
    },
  });
  

export const { setfilteredJobs , setAppliedJobs } = jobSlice.actions;
export default jobSlice.reducer;

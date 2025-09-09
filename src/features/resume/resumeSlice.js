import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInterviewUserHistory , createEmptyUserResume, fetchUserResumeById , updateUserResumeById , uploadExistingUserResume } from "./resumeAPI";

export const fetchInterviewHistory = createAsyncThunk("interview/history", async () => {
  return await fetchInterviewUserHistory();
});

export const createEmptyResume = createAsyncThunk("resume/create-empty", 
  async (emptyResume, { rejectWithValue }) => {
    try {
      const response = await createEmptyUserResume(emptyResume);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchResumeById = createAsyncThunk("resume/fetch-by-id", 
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchUserResumeById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateResumeById = createAsyncThunk("resume/update-resume-by-id",
  async (resumeData, { rejectWithValue }) => {
    try {
      const response = await updateUserResumeById(resumeData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadExistingResume = createAsyncThunk("resume/upload-existing", 
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadExistingUserResume(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const resumeSlice = createSlice({
    name: "resume",
    initialState: {
      parsedResume: {},
      history: null,
      saveChangesLoader: false,
      loading: false,
      error: null,
    },
    reducers: {
      setParsedResume: (state, action) => {
        state.parsedResume = action.payload;
      },
      updateField: (state, action) => {
        const { path, value } = action.payload;
        const pathParts = path.split(/[.[\]]/).filter(Boolean);
      
        // Always start from parsedResume, and ensure it’s at least {}
        if (!state.parsedResume) {
          state.parsedResume = {};
        }
      
        let current = state.parsedResume;
      
        for (let i = 0; i < pathParts.length - 1; i++) {
          const key = pathParts[i];
          const nextKey = pathParts[i + 1];
      
          if (!current[key]) {
            // If next key is a number → array, else → object
            current[key] = isNaN(nextKey) ? {} : [];
          }
      
          current = current[key];
        }
      
        const lastKey = pathParts[pathParts.length - 1];
        current[lastKey] = value;
      }          
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchInterviewHistory.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchInterviewHistory.fulfilled, (state, action) => {
          state.loading = false;
          state.history = action.payload;
        })
        .addCase(fetchInterviewHistory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
        
    },
    extraReducers: (builder) => {
      builder
        .addCase(createEmptyResume.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createEmptyResume.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload?.data?.id) {
            state.parsedResume = {
              ...action.meta.arg, // The emptyResume we passed
              id: action.payload.data.id,
              template: "Default"
            };
          }
        })
        .addCase(createEmptyResume.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to create empty resume';
        });
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload",action.payload)
        state.parsedResume = action.payload.data.cv_resumejson;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create empty resume';
      });
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateResumeById.pending, (state) => {
          state.saveChangesLoader = true;
          state.error = null;
        })
        .addCase(updateResumeById.fulfilled, (state, action) => {
          state.saveChangesLoader = false;
          if (action.payload?.data?.cv_resumejson) {
            state.parsedResume = action.payload.data.cv_resumejson;
          }
        })
        .addCase(updateResumeById.rejected, (state, action) => {
          state.saveChangesLoader = false;
          state.error = action.payload || 'Failed to update resume';
        });
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadExistingResume.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(uploadExistingResume.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload?.data) {
            state.parsedResume = action.payload.data;
          }
        })
        .addCase(uploadExistingResume.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to upload resume';
        });
    }
  });
  

export const { setParsedResume , updateField  } = resumeSlice.actions;
export default resumeSlice.reducer;

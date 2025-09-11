import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEmptyUserResume, fetchUserResumeById , updateUserResumeById , uploadExistingUserResume , generateUserCvAi , analyzeUserSummaryAi } from "./resumeAPI";


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

export const generateCvAi = createAsyncThunk("resume/generate-cv-ai", 
  async (formData, { rejectWithValue }) => {
    try {
      const response = await generateUserCvAi(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const analyzeSummaryAi = createAsyncThunk("resume/analyze-summary-ai", 
  async (formData, { rejectWithValue }) => {
    try {
      const response = await analyzeUserSummaryAi(formData);
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
      saveChangesLoader: false,
      AiCvLoader: false,
      AiSummaryLoader: false,
      selectedTemplate:"Default",
      prevParsedResume:{},
      SummaryIssues: [],
      SummarySuggestions: "",
      loading: false,
      error: null,
    },
    reducers: {
      setSelectedTemplate: (state, action) => {
        state.selectedTemplate = action.payload;
      },
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
      // Fetch Interview History
      builder
        // Create Empty Resume
        .addCase(createEmptyResume.pending, (state) => {
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.loading = true;
          state.error = null;
        })
        .addCase(createEmptyResume.fulfilled, (state, action) => {
          state.loading = false;
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
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
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.error = action.payload || 'Failed to create empty resume';
        })
        
        // Fetch Resume By ID
        .addCase(fetchResumeById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchResumeById.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload?.data?.cv_resumejson) {
            state.prevParsedResume = action.payload.data.cv_resumejson;
            state.parsedResume = action.payload.data.cv_resumejson;
          }
        })
        .addCase(fetchResumeById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch resume';
        })
        
        // Update Resume By ID
        .addCase(updateResumeById.pending, (state) => {
          state.saveChangesLoader = true;
          state.error = null;
        })
        .addCase(updateResumeById.fulfilled, (state, action) => {
          state.saveChangesLoader = false;
          if (action.payload?.data?.cv_resumejson) {
            state.prevParsedResume = action.payload.data.cv_resumejson;
            state.parsedResume = action.payload.data.cv_resumejson;
          }
        })
        .addCase(updateResumeById.rejected, (state, action) => {
          state.saveChangesLoader = false;
          state.error = action.payload || 'Failed to update resume';
        })
        
        // Upload Existing Resume
        .addCase(uploadExistingResume.pending, (state) => {
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.loading = true;
          state.error = null;
        })
        .addCase(uploadExistingResume.fulfilled, (state, action) => {
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.loading = false;
          if (action.payload?.data) {
            state.parsedResume = action.payload.data;
          }
        })
        .addCase(uploadExistingResume.rejected, (state, action) => {
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.loading = false;
          state.error = action.payload || 'Failed to upload resume';
        })

        // Generate CV AI
        .addCase(generateCvAi.pending, (state) => {
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.AiCvLoader = true;
          state.error = null;
        })
        .addCase(generateCvAi.fulfilled, (state, action) => {
          state.AiCvLoader = false;
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          console.log("action.payload CV AI",action.payload);
          if (action.payload?.data) {
            state.parsedResume = action.payload.data;
          }
        })
        .addCase(generateCvAi.rejected, (state, action) => {
          state.AiCvLoader = false;
          state.SummarySuggestions = "";
          state.SummaryIssues = [];
          state.error = action.payload || 'Failed to generate CV';
        })
        .addCase(analyzeSummaryAi.pending, (state) => {
          state.AiSummaryLoader = true;
          state.error = null;
        })
        .addCase(analyzeSummaryAi.fulfilled, (state, action) => {
          state.AiSummaryLoader = false;
          console.log("action.payload analyze summary AI",action.payload);
          state.SummaryIssues = action.payload.data.issues;
          state.SummarySuggestions = action.payload.data.suggested_changes;
        })
        .addCase(analyzeSummaryAi.rejected, (state, action) => {
          state.AiSummaryLoader = false;
          state.error = action.payload || 'Failed to generate CV';
        });
    }
  });
  

export const { setParsedResume , updateField , setSelectedTemplate } = resumeSlice.actions;
export default resumeSlice.reducer;

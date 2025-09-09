import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInterviewUserHistory } from "./resumeAPI";


export const fetchInterviewHistory = createAsyncThunk("interview/history", async () => {
  return await fetchInterviewUserHistory();
});

const resumeSlice = createSlice({
    name: "resume",
    initialState: {
      parsedResume:{},
      history: null,
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
  });
  

export const { setParsedResume , updateField } = resumeSlice.actions;
export default resumeSlice.reducer;

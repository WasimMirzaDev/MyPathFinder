import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInterviewUserHistory } from "./interviewAPI";


export const fetchInterviewHistory = createAsyncThunk("interview/history", async () => {
  return await fetchInterviewUserHistory();
});

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
      filters: {
        difficulty: null,
        questionType: null,
        subcategory: null,
        searchQuery: ""
      },
      history: null,
      interviews: null,
      loading: false,
      error: null,
    },
    reducers: {
      setFilters: (state, action) => {
        state.filters = {
          ...state.filters,
          ...action.payload
        };
      },
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
  

export const { setFilters } = interviewSlice.actions;
export default interviewSlice.reducer;

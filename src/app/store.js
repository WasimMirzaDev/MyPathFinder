import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user/userSlice";
import resumeReducer from "../features/resume/resumeSlice";
import interviewReducer from "../features/interview/interviewSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'error', 'AiCvLoader', 'AiSummaryLoader', 'coverletterLoader', 'emptyResumeLoader']
};

const persistedResumeReducer = persistReducer(persistConfig, resumeReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    resume: persistedResumeReducer,
    interview: interviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

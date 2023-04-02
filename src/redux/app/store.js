import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import uploadSlice from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    upload: uploadSlice,
  },
});

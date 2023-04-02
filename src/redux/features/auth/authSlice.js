import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { loginService, registerService } from "./authService";

const LC_USER = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: LC_USER ? LC_USER : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  type: "",
};

export const register = createAsyncThunk("register", async (user, thunkAPI) => {
  user.id = uuidv4();

  try {
    return await registerService(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk("login", async (user, thunkAPI) => {
  try {
    return await loginService(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.type = "";
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.type = "auth/register";
        if (action.payload.status) {
          state.user = action.payload.data;
          state.isSuccess = true;
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        } else {
          state.isError = true;
          state.message = action.payload.data;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.type = "auth/register";
        state.message = action.payload.data;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.type = "auth/login";
        if (action.payload.status) {
          state.isSuccess = true;
          state.user = action.payload.data;
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        } else {
          state.isError = true;
          state.message = action.payload.data;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.data;
        state.type = "auth/login";
      });
  },
});

export const { resetState, logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  studentData: [],
  isSucess: false,
  isError: false,
  type: "",
};

export const uploadStudentData = createAsyncThunk(
  "studentdata/upload",
  async (data, thunkAPI) => {
    data = data.map((item) => {
      item.id = uuidv4();
      return item;
    });

    try {
      const res = await axios.post(`http://localhost:5000/userdata`, {
        studentData: JSON.stringify(data),
        id: uuidv4(),
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getStudentData = createAsyncThunk(
  "studentdata/get",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5000/userdata`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isError = false;
      state.isSucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadStudentData.fulfilled, (state, action) => {
        const data = JSON.parse(action.payload.studentData);
        state.studentData = [...state.studentData, ...data];
        state.isSucess = true;
        state.type = "studentdata/add";
      })
      .addCase(uploadStudentData.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
        state.type = "studentdata/add";
      })
      .addCase(getStudentData.fulfilled, (state, action) => {
        const data = JSON.parse(action.payload[0].studentData);
        state.studentData = data;
        state.isSucess = true;
        state.type = "studentdata/get";
      })
      .addCase(getStudentData.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
        state.type = "studentdata/get";
      });
  },
});
export const { resetState } = uploadSlice.actions;
export default uploadSlice.reducer;

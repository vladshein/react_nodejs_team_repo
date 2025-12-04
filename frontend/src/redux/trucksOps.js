import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const fetchTrucksOp = createAsyncThunk(
  "trucks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get();
      console.log("response.data.results", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const fetchOneOp = createAsyncThunk("trucks/fetchOne", async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`/${id}/`);
    console.log("response.data.results", data);
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { fetchTrucksOp, fetchOneOp };

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const getExecutorsData = createAsyncThunk(
  "executorsData/getExecutorsData",
  async (data, thunkAPI) => {
    try {
      const response = await instance.get(
        `v1/pages/subcategory/${data.category}/${data.subcategory}/show`
      );
      return response.data;
    } catch (e) {
      console.log(e.response, "register error");
      return thunkAPI.rejectWithValue("Что то пошло не так");
    }
  }
);

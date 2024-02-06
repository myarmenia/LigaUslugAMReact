import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../api/api';

export const getQuestionPageData = createAsyncThunk(
  'question/getQuestinPageData',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('v1/pages/get_answer_and_question');
      return response.data.message;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue('error');
    }
  },
);

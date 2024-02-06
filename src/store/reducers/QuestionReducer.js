import { createSlice } from '@reduxjs/toolkit';
import { getQuestionPageData } from '../actions/QuestionActions';

const initialState = {
  load: false,
  questionData: {},
  error: '',
};

const QuestionSlice = createSlice({ 
  name: 'question',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(getQuestionPageData.pending, (state) => {
      state.load = true;
    })
    .addCase(getQuestionPageData.fulfilled, (state, { payload }) => {
      state.questionData = payload;
      state.load = false;
    })
    .addCase(getQuestionPageData.rejected, (state, { payload }) => {
      state.error = payload;
      state.load = false;
    });
  }
  // extraReducers: {
  //   [getQuestionPageData.pending]: (state) => {
  //     state.load = true;
  //   },
  //   [getQuestionPageData.fulfilled]: (state, { payload }) => {
  //     state.questionData = payload;
  //     state.load = false;
  //   },
  //   [getQuestionPageData.rejected]: (state, { payload }) => {
  //     state.error = payload;
  //     state.load = false;
  //   },
  // },
});

export default QuestionSlice.reducer;

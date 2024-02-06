import { createSlice } from '@reduxjs/toolkit';
import {
   getExecutorBalance,
   getExecutorPageData,
   increaseExecutorBalance,
} from '../actions/ExecutorDataActions';

const initialState = {
   executor: {},
   load: false,
   error: '',
   message: '',
   balanceInfo: null,
};

const executorDataSlice = createSlice({
   name: 'executor',
   initialState,
   reducers: {
      setInitialState: (state) => {
         state = initialState;
      },
      setChngeData: (state, { payload }) => {
         state.executor = payload;
      },
   },

   //  extraReducers: {
   //     [getExecutorPageData.pending]: (state) => {
   //       state.load = true;
   //     },
   //     [getExecutorPageData.fulfilled]: (state, action) => {
   //       state.load = false;
   //       state.executor = action.payload.data;
   //       state.error = false;
   //       state.message = "";
   //     },
   //     [getExecutorPageData.rejected]: (state, action) => {
   //       state.load = false;
   //       state.error = true;
   //       state.executor = {};
   //       state.message = action.payload;
   //     },
   //     [getExecutorBalance.pending]: (state, { payload }) => {
   //        state.load = true;
   //     },
   //     [getExecutorBalance.fulfilled]: (state, { payload }) => {
   //        state.load = false;
   //        state.balanceInfo = payload[0] || null;
   //     },
   //     [getExecutorBalance.rejected]: (state, { payload }) => {
   //        state.load = false;
   //     },
   //     [increaseExecutorBalance.fulfilled]: (state, { payload }) => {
   //        state.balanceInfo = payload || null;
   //     },
   //  },

   extraReducers: (builder) => {
      builder
         .addCase(getExecutorPageData.pending, (state) => {
            state.load = true;
         })
         .addCase(getExecutorPageData.fulfilled, (state, action) => {
            state.load = false;
            state.executor = action.payload.data;
            state.error = false;
            state.message = '';
         })
         .addCase(getExecutorPageData.rejected, (state, action) => {
            state.load = false;
            state.error = true;
            state.executor = {};
            state.message = action.payload;
         })
         .addCase(getExecutorBalance.pending, (state) => {
            state.load = true;
         })
         .addCase(getExecutorBalance.fulfilled, (state, { payload }) => {
            state.load = false;
            state.balanceInfo = payload[0] || null;
         })
         .addCase(getExecutorBalance.rejected, (state, { payload }) => {
            state.load = false;
         })
         .addCase(increaseExecutorBalance.rejected, (state, { payload }) => {
            state.balanceInfo = payload || null;
         });
   },
});
export const { setChngeData } = executorDataSlice.actions;
export default executorDataSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../actions/FilterOrdersActions';

const filterOrdersSlice = createSlice({
   name: 'filterOrders',
   initialState: {
      error: false,
      load: false,
      loadBtn: false,
      message: '',
      submitCategories: '',
      categories: [],
   },
   reducers: {
      resetPartReducer: (state) => {
         state.successWork = false;
         state.error = false;
         state.message = '';
      },
      removeFilterCategory: (state, { payload }) => {
         state.categories = {
            ...state.categories,
            executor_categories: state.categories.executor_categories.filter(
               (el) => el.category_name !== payload,
            ),
         };
      },
      addListToExecutorCategory: (state, { payload }) => {
         state.categories = {
            ...state.categories,
            executor_categories: [...state.categories.executor_categories, ...payload],
         };
      },
      setSubmitCategories: (state, { payload }) => {
         state.submitCategories = payload;
      },
      addChangeListToExecutorCategory: (state, { payload }) => {
         state.categories = {
            ...state.categories,
            executor_categories: [{ category_name: payload }],
         };
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(getCategories.pending, (state) => {
            state.loadBtn = true;
         })
         .addCase(getCategories.fulfilled, (state, action) => {
            state.loadBtn = false;
            state.error = false;
            state.categories = action.payload;
         })
         .addCase(getCategories.rejected, (state, action) => {
            state.loadBtn = false;
            state.error = true;
         });
   },

   // extraReducers: {
   //   [getCategories.pending]: (state) => {
   //     state.loadBtn = true;
   //   },
   //   [getCategories.fulfilled]: (state, action) => {
   //     state.loadBtn = false;
   //     state.error = false;
   //     state.categories = action.payload;
   //   },
   //   [getCategories.rejected]: (state, action) => {
   //     state.loadBtn = false;
   //     state.error = true;
   //   },
   // },
});

export const {
   resetPartReducer,
   removeFilterCategory,
   addListToExecutorCategory,
   setSubmitCategories,
   addChangeListToExecutorCategory,
} = filterOrdersSlice.actions;

export default filterOrdersSlice.reducer;

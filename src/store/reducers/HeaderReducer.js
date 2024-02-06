import { createSlice } from '@reduxjs/toolkit';
import { getHeaderData, getRayonData, getRegionData, getLocality } from '../actions/HeaderActions';

const initialState = {
   load: false,
   loading: false,
   error: '',
   message: '',
   header: {},
   successWork: false,
   regions: [],
   rayons: [],
   cities: [],
};

const headerSlice = createSlice({
   name: 'header',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(getHeaderData.pending, (state) => {
            state.load = true;
         })
         .addCase(getHeaderData.fulfilled, (state, action) => {
            state.load = false;
            state.error = false;
            state.header = action.payload;
            state.successWork = true;
         })
         .addCase(getHeaderData.rejected, (state, action) => {
            state.load = false;
            state.error = true;
            state.message = action.payload;
            state.successWork = false;
         })
         .addCase(getRegionData.fulfilled, (state, action) => {
            state.regions = action.payload.message;
         })
         .addCase(getRayonData.fulfilled, (state, action) => {
            state.rayons = action.payload.message;
         })
         .addCase(getLocality.pending, (state) => {
            state.loading = true;
         })
         .addCase(getLocality.fulfilled, (state, action) => {
            state.error = false;
            state.successWork = true;
            state.cities = action.payload;
            state.loading = false;
         })
         .addCase(getLocality.rejected, (state) => {
            state.loading = false;
            state.error = true;
         });
   },

   // extraReducers: {
   //     [getHeaderData.pending]: (state) => {
   //         state.load = true
   //     },
   //     [getHeaderData.fulfilled]: (state, action) => {
   //         state.load = false
   //         state.error = false
   //         state.header = action.payload
   //         state.successWork = true
   //     },
   //     [getHeaderData.rejected]: (state, action) => {
   //         state.load = false
   //         state.error = true
   //         state.message = action.payload
   //         state.successWork = false
   //     },
   //     [getRegionData.fulfilled]: (state, action) => {
   //         state.regions = action.payload.message
   //     },
   //     [getRayonData.fulfilled]: (state, action) => {
   //      state.rayons = action.payload.message
   //     },
   //     [getLocality.pending]: (state) => {
   //         state.loading = true
   //     },
   //     [getLocality.fulfilled]: (state, action) => {
   //         state.error = false
   //         state.successWork = true
   //         state.cities = action.payload
   //         state.loading = false
   //     },
   //     [getLocality.rejected]: (state) => {
   //         state.loading = false
   //         state.error = true
   //     },
   // }
});

export default headerSlice.reducer;

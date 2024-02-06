import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../api/api';

export const getHeaderData = createAsyncThunk('header/getHeaderData', async (_, thunkAPI) => {
   try {
      const response = await instance.get('v1/pages/header');
      return response.data;
   } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
   }
});

export const getRegionData = createAsyncThunk('header/gеtRegionData', async (_, thunkAPI) => {
   try {
      const response = await instance.get('v1/pages/regions');
      return response.data;
   } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
   }
});
export const getRayonData = createAsyncThunk('header/getRayonData', async (_, thunkAPI) => {
   try {
      const response = await instance.get('v1/pages/rayons');
      return response.data;
   } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
   }
});

export const getLocality = createAsyncThunk('taskExecutor/Locality', async (data, thunkAPI) => {
   try {
      const response = await instance.post('v1/user/locality', {
         region_id: data.region_id,
      });
      return response.data.message;
   } catch (err) {
      console.log(err);
      thunkAPI.rejectWithValue('err');
   }
});

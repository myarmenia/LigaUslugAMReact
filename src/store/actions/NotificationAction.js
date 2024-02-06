import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../api/api';

export const getAllNotifications = createAsyncThunk(
   'notifications/getAllNotifications',
   async (_, thunkAPI) => {
      try {
         const response = await instance.post('v1/user/notification/get');

         return response.data;
      } catch (e) {
         console.log(e, 'error during get all notifications');
         return thunkAPI.rejectWithValue('что то пошло не так');
      }
   },
);

export const readNotification = createAsyncThunk(
   'notification/readNotification',
   async (id, thunkAPI) => {
      try {
         const response = await instance.post('v1/user/notification/read', { id });
         return response.data.notification;
      } catch (err) {
         console.log('error during read notification');
      }
   },
);

export const deleteNotification = createAsyncThunk(
   'notification/deleteNotification',
   async (id, thunkApi) => {
      try {
         const response = await instance.post(`v1/user/notification/${id}/delete`, {
            _method: 'delete',
         });
         return response.data;
      } catch (err) {
         console.log(err);
      }
   },
);

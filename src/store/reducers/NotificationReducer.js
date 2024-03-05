import { createSlice } from '@reduxjs/toolkit';
import {
   deleteNotification,
   getAllNotifications,
   readNotification,
} from '../actions/NotificationAction';
// import {ForgetPassword, Login, Logouts, Registration} from "../actions/AuthActions";

const initialState = {
   notifications: null,
   unReadCount: null,
   reGetNotification: false,
};

const notificationSlice = createSlice({
   name: 'notifications',
   initialState,
   reducers: {
      setNewNatification: (state, { payload }) => {
         state.notifications = payload?.message?.map((el) => ({
            data: JSON.parse(el.data),
            id: el.id,
            type: el.type,
            created_at: el.created_at,
            read_at: el.read_at,
         }));
      },
      setNatificationCount: (state, { payload }) => {
         state.unReadCount = payload;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(getAllNotifications.fulfilled, (state, { payload }) => {
            state.unReadCount = payload.count;
            state.reGetNotification = false;
            state.notifications = payload.notification.map((el) => ({
               data: el.data,
               id: el.id,
               type: el.type,
               created_at: el.created_at,
               read_at: el.read_at,
            }));
         })
         .addCase(deleteNotification.fulfilled, (state, { payload }) => {
            state.reGetNotification = true;
         })
         .addCase(readNotification.fulfilled, (state, { payload }) => {
            state.reGetNotification = true;
            state.notifications = payload.map((el) => ({
               data: JSON.parse(el.data),
               id: el.id,
               type: el.type,
               created_at: el.created_at,
               read_at: el.read_at,
            }));
         });
   },

   // extraReducers: {
   //   [getAllNotifications.fulfilled]: (state, { payload }) => {

   //     state.unReadCount = payload.count;
   //     state.reGetNotification = false;
   //     state.notifications = payload.notification.map((el) => ({
   //       data: el.data,
   //       id: el.id,
   //       type: el.type,
   //       created_at: el.created_at,
   //       read_at: el.read_at,
   //     }));
   //     // console.log(payload.notification);
   //   },
   //   [deleteNotification.fulfilled]: (state, { payload }) => {
   //     state.reGetNotification = true;

   //   },
   //   [readNotification.fulfilled]: (state, { payload }) => {
   //     state.reGetNotification = true;
   //     state.notifications = payload.map((el) => ({
   //       data: JSON.parse(el.data),
   //       id: el.id,
   //       type: el.type,
   //       created_at: el.created_at,
   //       read_at: el.read_at,
   //     }));
   //   },
   // },
});

export const { setNewNatification, setNatificationCount } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
   askQuestion,
   exactConversation,
   getConversationTaskList,
   leaveNumber,
} from '../actions/MessageActions';

const initialState = {
   load: false,
   tasksList: null,
   conversation: null,
   activeTaskInfo: {},
   message: '',
   messageCount: null,
};
const messagingSlice = createSlice({
   name: 'messages',
   initialState,
   reducers: {
      setActiveTaskInfo: (state, { payload }) => {
         state.activeTaskInfo = payload;
      },
      setMessage: (state, { payload }) => {
         state.message = payload;
      },
      setSocteMessage: (state, { payload }) => {
         state.conversation = payload;
      },
      setTasksList: (state, { payload }) => {
         state.tasksList = payload;
      },
      setMessageCount: (state, { payload }) => {
         state.messageCount = payload;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(getConversationTaskList.fulfilled, (state, { payload }) => {
            state.tasksList = payload?.data;
            state.activeTaskInfo = payload?.data[0];
         })
         .addCase(exactConversation.fulfilled, (state, { payload }) => {
            state.conversation = payload;
         })
         .addCase(leaveNumber.pending, (state) => {
            state.load = true;
         })
         .addCase(leaveNumber.fulfilled, (state, action) => {
            state.load = false;
            state.message = action.payload;
         })
         .addCase(leaveNumber.rejected, (state, action) => {
            state.load = false;
            state.message = action.payload;
         })
         .addCase(askQuestion.pending, (state) => {
            state.load = true;
         })
         .addCase(askQuestion.fulfilled, (state, action) => {
            state.load = false;
            state.message = action.payload;
         })
         .addCase(askQuestion.rejected, (state, action) => {
            state.load = false;
            state.message = action.payload;
         });
   },

   // extraReducers: {
   //   [getConversationTaskList.fulfilled]: (state, { payload }) => {
   //     state.tasksList = payload?.data;
   //     state.activeTaskInfo = payload?.data[0];
   //   },
   //   [exactConversation.fulfilled]: (state, { payload }) => {
   //     state.conversation = payload;
   //   },
   //   // [sendMessageThunk.fulfilled]: (state, {payload}) => {
   //   // 	// state.conversation = payload
   //   // },
   //   [leaveNumber.pending]: (state) => {
   //     state.load = true;
   //   },
   //   [leaveNumber.fulfilled]: (state, action) => {
   //     state.load = false;
   //     state.message = action.payload;
   //   },
   //   [leaveNumber.rejected]: (state, action) => {
   //     state.load = false;
   //     state.message = action.payload;
   //   },
   //   [askQuestion.pending]: (state) => {
   //     state.load = true;
   //   },
   //   [askQuestion.fulfilled]: (state, action) => {
   //     state.load = false;
   //     state.message = action.payload;
   //   },
   //   [askQuestion.rejected]: (state, action) => {
   //     state.load = false;
   //     state.message = action.payload;
   //   },
   // },
});
export const selectConversationTaskList = (state) => state.messages.tasksList;
export const selectActiveTaskInfo = (state) => state.messages.activeTaskInfo;
export const selectMessage = (state) => state.messages.message;

export const { setActiveTaskInfo, setMessage, setSocteMessage, setTasksList, setMessageCount } =
   messagingSlice.actions;
export default messagingSlice.reducer;

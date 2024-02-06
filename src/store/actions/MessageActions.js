import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance, unAuthorizedInstance } from '../api/api';

export const sendMessageThunk = createAsyncThunk('message/sentMessage', async (data, thunkAPI) => {
  try {
    const response = await instance.post('v1/user/chat-room', data);
    return response.data.message;
  } catch {
    console.log('error during send message');
  }
});

export const getConversationTaskList = createAsyncThunk(
  'message/getConversationTaskList',
  async (chatroom_name, thunkAPI) => {
    try {
      const response = await instance.get('v1/user/employer-tasks-chat');
      return response.data;
    } catch (err) {
      console.log('error during get tasks');
    }
  },
);

export const exactConversation = createAsyncThunk(
  'message/exactConversation',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/task-chat', data);
      return response.data.message;
    } catch (err) {
      console.log('error during get exact conversation');
    }
  },
);
// https://api.nver.am/api/v1/user/chat-file
export const sendConversationFile = createAsyncThunk(
  'message/sendConversationFile',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/chat-file', data);
      return response.data;
    } catch (err) {
      console.log('error during send conversation file');
    }
  },
);
export const askQuestion = createAsyncThunk('message/askQuestion', async (data, thunkAPI) => {
  try {
    const response = await instance.post('v1/pages/givequestiontoadmin', data);
    return response.data.message;
  } catch {
    console.log('send message something went wrong');
    thunkAPI.rejectWithValue(false);
  }
});

export const leaveNumber = createAsyncThunk('message/leaveNumber', async (data, thunkAPI) => {
  try {
    const response = await unAuthorizedInstance.post('v1/pages/callback', data);
    return response.data.message;
  } catch (err) {
    console.log('leave number something went wrong');
    thunkAPI.rejectWithValue(false);
  }
});

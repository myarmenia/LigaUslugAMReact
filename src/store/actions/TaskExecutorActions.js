import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../api/api';

export const getAllTasks = createAsyncThunk('taskExecutor/getAllTasks', async (_, thunkAPI) => {
   try {
      const response = await instance.get('v1/user/show-all-tasks-to-executor');
      return response.data;
   } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Միբան այն չի եղել');
   }
});

export const clickOnTask = createAsyncThunk('taskExecutor/clickOnTask', async (data, thunkAPI) => {
   try {
      const response = await instance.post('v1/user/click-on-task', data);
      return response.data;
   } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Միբան այն չի եղել');
   }
});
export const taskCountExecutor = createAsyncThunk(
   'taskExecutor/clickOnTasks',
   async (_, thunkAPI) => {
      try {
         const response = await instance.get('v1/user/executor-task-section-count/executor');
         return response.data;
      } catch (e) {
         console.log(e.response, 'register error');
         return thunkAPI.rejectWithValue('Միբան այն չի եղել');
      }
   },
);

// {
//     "executor_categories":["IT услуги","Автосервис"],
//     "region":"Красноярский край",
//     "task_location":"client",
//     "task_price":{
//     "price_from":1000,"price_to":5000
// }

export const filterExecutorTask = createAsyncThunk(
   'taskExecutor/filterTasks',
   async (data, thunkAPI) => {
      try {
         const newData = {
            executor_categories: data.executor_categories,
            region: data.region.filter((e) => !!e),
         };
         const response = await instance.post('v1/user/filter', newData);
         return response.data.data;
      } catch (err) {
         thunkAPI.rejectWithValue('error during filter tasks');
      }
   },
);

export const getResponseOrders = createAsyncThunk(
   'taskExecutor/responseOrders',
   async (_, thunkAPI) => {
      try {
         const response = await instance.get('v1/user/responded-task-for-executor');
         return response.data.ClickOnTask;
      } catch (err) {
         thunkAPI.rejectWithValue('err');
      }
   },
);
export const getWorkOrders = createAsyncThunk('taskExecutor/workOrders', async (_, thunkAPI) => {
   try {
      const response = await instance.get('v1/user/tasks-in-progress-for-executor');
      return response.data.tasks;
   } catch (err) {
      console.log(err);
      thunkAPI.rejectWithValue('err');
   }
});

export const getCompletedOrders = createAsyncThunk(
   'taskExecutor/completedOrders',
   async (_, thunkAPI) => {
      try {
         const response = await instance.get('v1/user/completed-task-executor');
         return response.data.tasks;
      } catch (err) {
         console.log(err);
         thunkAPI.rejectWithValue('err');
      }
   },
);
export const getNotConfirmedEmployer = createAsyncThunk(
   'taskExecutor/completedOrders',
   async (_, thunkAPI) => {
      try {
         const response = await instance.get('v1/user/special-task-for/executor');
         return response.data.special_task;
      } catch (err) {
         console.log(err);
         thunkAPI.rejectWithValue('err');
      }
   },
);

export const getOrdersNotSelected = createAsyncThunk(
   'taskExecutor/ordersNotSelected',
   async (_, thunkAPI) => {
      try {
         const response = await instance.get('v1/user/show-all-tasks-to-executor');
         return response.data.Tasks;
      } catch (err) {
         console.log(err);
         thunkAPI.rejectWithValue('err');
      }
   },
);
export const postFinshInWork = createAsyncThunk(
   'taskExecutor/finishTask',
   async (data, thunkAPI) => {
      try {
         const response = await instance.post('v1/user/material-work-price', data);
         return response.data.tasks;
      } catch (err) {
         console.log(err);
         thunkAPI.rejectWithValue('err');
      }
   },
);

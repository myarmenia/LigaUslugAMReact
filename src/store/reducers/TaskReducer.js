import { createSlice } from '@reduxjs/toolkit';
import {
  AddNewTask,
  addTaskMeeting,
  createRating,
  deleteTask,
  finishTask,
  getCauntEmployerTasks,
  getCompletedTasks,
  getInProcessTasks,
  getNotAppliedTasks,
  getNotConfirmedExecutor,
  getRespondedTasks,
  messageToModerator,
  rejectExecutor,
  selectExecutor,
} from '../actions/TaskActions';

const initialState = {
  error: false,
  load: false,
  loadBtn: false,
  rejectLoadBtn: false,
  successWork: false,
  message: '',
  tasksList: [],
  completedTasks: [],
  notAppliedTasks: [],
  respondedTasks: [],
  inProcessTasks: [],
  activTask: [],
  status: 'notApplied',
  tasksCount: {},
};
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetPartReducer: (state) => {
      state.successWork = false;
      state.error = false;
      state.message = '';
    },
    resetTask: () => initialState,
    setActivTask: (state, { payload }) => {
      state.activTask = payload;
    },
    setTaskList: (state, { payload }) => {
      state.tasksList = payload;
    },
    setTaskCount: (state, { payload }) => {
      state.tasksCount = payload;
    },
    // setTaskDeletExsecutr: (state, { payload }) => {
    //   state.tasksList = payload;
    // },
  },
  extraReducers: {
    [getNotConfirmedExecutor.pending]: (state) => {
      state.load = true;
    },
    [getNotConfirmedExecutor.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.tasksList = action.payload;
      state.status = 'completed';
    },
    [getNotConfirmedExecutor.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
    },
    [getCompletedTasks.pending]: (state) => {
      state.load = true;
    },
    [getCompletedTasks.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.tasksList = action.payload;
      state.status = 'completed';
      // state.tasksCount = {
      //   ...state.tasksCount,
      //   completedtask: action?.payload?.executor_profile_id?.executor_review_count,
      // };
    },
    [getCompletedTasks.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
    },
    [messageToModerator.pending]: (state) => {
      state.load = true;
    },
    [messageToModerator.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.tasksList = action.payload;
      state.status = 'completed';
    },
    [messageToModerator.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
    },
    //notApplied
    [getNotAppliedTasks.pending]: (state) => {
      state.load = true;
    },
    [getNotAppliedTasks.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.tasksList = action.payload;
      state.status = 'notApplied';
    },
    [getNotAppliedTasks.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
    },
    //responded tasks
    [getRespondedTasks.pending]: (state) => {
      state.load = true;
    },
    [getRespondedTasks.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.tasksList = action.payload.message ? action.payload.message : [];
      state.status = 'applied';
    },
    [getRespondedTasks.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
    },
    //In process tasks
    [getInProcessTasks.pending]: (state) => {
      state.load = true;
    },
    [getInProcessTasks.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.tasksList = action.payload.tasks ? action.payload.tasks : [];
      state.status = 'inProcess';
    },
    [getInProcessTasks.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
    },
    //create task
    [AddNewTask.pending]: (state) => {
      state.loadBtn = true;
    },
    [AddNewTask.fulfilled]: (state, { payload }) => {
      state.loadBtn = false;
      state.error = false;
      state.successWork = true;
      state.task = {
        ...state.task,
        tasksList: [...payload, ...state.tasksList],
      };
      state.message = 'Заказ успешно добавлен';
    },
    [AddNewTask.rejected]: (state, action) => {
      state.loadBtn = false;
      state.error = true;
      state.message = 'Что то пошло не так';
    },
    //select executor
    [selectExecutor.pending]: (state) => {
      state.load = true;
    },
    [selectExecutor.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.message = 'Исполнитель успешно вибран';
      state.successWork = true;
    },
    [selectExecutor.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
      state.message = 'Что то пошло не так';
      state.load = false;
    },
    //reject executor
    [rejectExecutor.pending]: (state) => {
      state.load = true;
    },
    [rejectExecutor.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.message = 'Исполнитель успешно удален';
      state.successWork = true;
    },
    [rejectExecutor.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
      state.message = 'Что то пошло не так';
    },
    //finish task
    [finishTask.pending]: (state) => {
      state.load = true;
    },
    [finishTask.fulfilled]: (state, action) => {
      state.load = false;
      state.error = false;
      state.message = 'Вы успешно завершили';
      state.successWork = true;
    },
    [finishTask.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
      state.message = 'Что то пошло не так';
    },
    //delete task
    [deleteTask.pending]: (state) => {
      state.loadBtn = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loadBtn = false;
      state.error = false;
      state.message = action.payload.message;
      state.successWork = true;
    },
    [deleteTask.rejected]: (state, action) => {
      state.loadBtn = false;
      state.error = true;
      state.message = action.payload.message;
    },
    // create rating
    [createRating.pending]: (state) => {
      state.load = true;
    },
    [createRating.fulfilled]: (state, action) => {
      console.log(action);
      state.load = false;
      state.error = false;
      state.message = 'Все прошло успешно';
      state.successWork = true;
    },
    [createRating.rejected]: (state, action) => {
      state.load = false;
      state.error = true;
      state.message = action.payload.message;
    },

    [addTaskMeeting.fulfilled]: (state, { payload }) => {
      let temp = state.tasksList;
      temp = temp.map((el) => (el.id === payload.id ? payload : el));
      state.tasksList = temp;
    },
    [getCauntEmployerTasks.pending]: (state) => {
      state.load = true;
    },
    [getCauntEmployerTasks.fulfilled]: (state, { payload }) => {
      state.load = false;
      state.tasksCount = payload;
    },
    [getCauntEmployerTasks.rejected]: (state, action) => {
      state.load = false;
      // state.message = action.payload.message;
    },
  },
});

export const {
  resetPartReducer,
  resetTask,
  setActivTask,
  setTaskList,
  setTaskDeletExsecutr,
  setTaskCount,
} = taskSlice.actions;

export default taskSlice.reducer;

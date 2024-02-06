import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import TaskReducer from './reducers/TaskReducer';
import ProfileDataReducer from './reducers/ProfileDataReducer';
import ExecutorDataReducer from './reducers/ExecutorDataReducer';
import ExecutorsData from './reducers/ExecutorsData';
import headerReducer from './reducers/HeaderReducer';
import TaskExecutorReducer from './reducers/TaskExecutorReducer';
import filterOrdersReducer from './reducers/FilterOrdersReducer';
import notificationReducer from './reducers/NotificationReducer';
import messagingReducer from './reducers/MessagingReducer';
import QuestionSlice from './reducers/QuestionReducer';
import FilterhWorks from './reducers/FilterhWorksReducer'
// import FilterhWorksReducer from './reducers/FilterhWorksReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  task: TaskReducer,
  profile: ProfileDataReducer,
  executor: ExecutorDataReducer,
  header: headerReducer,
  taskExecutor: TaskExecutorReducer,
  filterOrders: filterOrdersReducer,
  notifications: notificationReducer,
  messages: messagingReducer,
  executors: ExecutorsData,
  question: QuestionSlice,
  // data:FilterhWorks
  filterWork: FilterhWorks,
  
});

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    if (getState().auth.hasOwnProperty('auth')) {
      localStorage.setItem('applicationState', JSON.stringify(getState().auth));
    }
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return { auth: JSON.parse(localStorage.getItem('applicationState')) }; // re-hydrate the index
  }
};
const index = configureStore({
  reducer: rootReducer,
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

// window.store = index;

export default index;

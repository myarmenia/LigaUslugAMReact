import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../api/api';

export const getProfilePageData = createAsyncThunk(
  'profile/getProfilePageData',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('v1/user/profile-page');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);
export const getЕxecutorProfilePageData = createAsyncThunk(
  'profile/getЕxecutorProfilePageData',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('v1/user/show-executor-profile');
      return response.data;
    } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);

export const choosesAvatarData = createAsyncThunk(
  'profile/choosesAvatar',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/update-avatar', data);
      return response.data;
    } catch (e) {
      console.log(e.response, 'avatar error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);

export const choosesProfessionData = createAsyncThunk(
  'profile/professionData',
  async (data, thunkAPI) => {
    if (data.profession_and_experience[0].executor_categories.length === 0) {
      data.profession_and_experience[0].executor_profile_work_experiences = [];
    }
    data.profession_and_experience[0].executor_profile_work_experiences =
      data.profession_and_experience[0].executor_profile_work_experiences.filter(
        (el) => el.working_place && el.recruitment_data && el.working_place,
      );
    try {
      const response = await instance.post('v1/user/profession-and-experience', data);
      return response.data;
    } catch (e) {
      console.log(e.response, 'professionData error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);

export const getProfileLogo = createAsyncThunk('profile/getProfileLogo', async (_, thunkAPI) => {
  try {
    const response = await instance.get('v1/user/show-profile-page');
    return response.data;
  } catch (e) {
    console.log(e.response, 'register error');
    return thunkAPI.rejectWithValue('Что то пошло не так');
    // return thunkAPI.rejectWithValue('Что то пошло не так')
  }
});

export const updateSocLink = createAsyncThunk('profile/updateSocLink', async (data, thunkAPI) => {
  try {
    const response = await instance.post('v1/user/update-soclink', data);
    return response.data;
  } catch (e) {
    console.log(e.response, 'update social link error');
    return thunkAPI.rejectWithValue('Что то пошло не так');
    // return thunkAPI.rejectWithValue('Что то пошло не так')
  }
});

export const verifyPhoneCode = createAsyncThunk(
  'profile/verifyPhoneCode',
  async (data, thunkAPI) => {
    
    try {
      const response = await instance.post('v1/user/phone-number-verification', {
        verification_code: data,
      });
      return response.data.message;
    } catch (err) {
      console.log(err);
    }
  },
);

export const updateNotifications = createAsyncThunk(
  'profile/updateNotifications',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/update-notification', data);
      return response.data;
    } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);

export const updatePersonalData = createAsyncThunk(
  'profile/updatePersonalData',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/update-executor-personal-data', data);
      return response.data;
    } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);

export const updatePortfolioData = createAsyncThunk(
  'profile/updatePortfolioData',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/portfolio', data);
      return response.data;
    } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);
export const updateExecutorData = createAsyncThunk(
  'profile/updateExecutorData',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/education-and-certificate', data);
      return response.data;
    } catch (e) {
      console.log(e.response, 'register error');
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);
export const updateAddressesData = createAsyncThunk(
  'profile/updateAddressesData',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/region-address', data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);
export const updateAddressesDataEmployer = createAsyncThunk(
  'profile/updateAddressesDataEmployer',
  async (data, thunkAPI) => {
    try {
      const response = await instance.post('v1/user/user-region-address', data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Что то пошло не так');
      // return thunkAPI.rejectWithValue('Что то пошло не так')
    }
  },
);

export const getUsersInformation = createAsyncThunk(
  'profile/userinformations',
  async (id, thunkAPI) => {
    try {
      const response = await instance.get(`v1/pages/header/${id}`);
      return response.data.executor[0];
    } catch (err) {
      console.log(err);
    }
  },
);

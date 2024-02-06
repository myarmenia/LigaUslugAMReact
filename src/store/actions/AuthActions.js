import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../api/api";

const setAuthHeader = (token) => {
    instance.defaults.headers.Authorization = `Bearer ${token}`
}
export const Registration = createAsyncThunk(
    'auth/registration',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post(`v1/user/register`, data)
            return response.data
        } catch (e) {
            console.log(e, 'register error')
            return thunkAPI.rejectWithValue(e.response.data.errors[0])
        }
    }
)

export const Login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post(`v1/user/login`, data)
            if(response.data.message) {
                return thunkAPI.rejectWithValue(response.data.message)
            }
            localStorage.setItem('token', response?.data?.access_token);
            setAuthHeader(response?.data?.access_token)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('неверный адрес электронной почты или пароль')
        }
    }
)

export const Logouts = createAsyncThunk(
    'auth/logout',
    async (_,thunkAPI) => {
        try {
            const response = await instance.post("v1/user/logout")
            localStorage.removeItem("token")
            return response.data
        } catch (e) {
            console.log(e.message)
            return thunkAPI.rejectWithValue('404 error')
        }
    }
)

export const ForgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post("v1/user/forgot", data)
            return response.data
        } catch (e) {
            console.log(e.message)
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const ResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post("v1/user/reset", data)
            return response.data
        } catch (e) {
            console.log(e.message)
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const RemoveUser = createAsyncThunk(
    'auth/removeUser',
    async (userId, thunkAPI) => {
        try {
            const response = await instance.post(`v1/user/${userId}/delete`, {_method: 'delete'})
        } catch(error) {
            console.log(error.messages)
        }
    }
    )


import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../api/api";

export const getCategories = createAsyncThunk(
    'filterOrders/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get("v1/user/as-in-application")
            return response.data
        } catch (e) {
            console.log(e.response, 'register error')
            return thunkAPI.rejectWithValue('Что то пошло не так')
        }
    }
)
import {createAsyncThunk} from "@reduxjs/toolkit"
import {instance} from "../api/api"

export const getExecutorPageData = createAsyncThunk(
	"executor/getExecutorPageData",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get("v1/user/show-executor-profile")
			return response.data
		} catch (e) {
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const getExecutorBalance = createAsyncThunk(
	"executor/getExecutorBalance",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get("v1/user/balance")
			return response.data
		} catch (e) {
			console.log(e, "error during get balance")
			return thunkAPI.rejectWithValue("что то пошло не так")
		}
	},
)

export const increaseExecutorBalance = createAsyncThunk(
	"executor/increaseExecutorBalance",
	async (amount, thunkAPI) => {
		try {
			const response = await instance.post("v1/user/increase-balance", {
				executor_account: amount,
			})
			
			const a = document.createElement("a")
			a.style = "display: none"
			a.setAttribute("href", response.data.url)
			a.setAttribute("target", "_blank")
			a.click()
			document.body.removeChild(a)
			return response.data.executor_account
		} catch (e) {
			console.log(e, "error during increase balance")
			thunkAPI.rejectWithValue(e)
		}
	},
)

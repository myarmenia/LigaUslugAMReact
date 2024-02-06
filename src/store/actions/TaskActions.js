import {createAsyncThunk} from "@reduxjs/toolkit"
import {instance} from "../api/api"

export const AddNewTask = createAsyncThunk(
	"task/addNewTask",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post("v1/user/create-new-task", data)

			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const getCompletedTasks = createAsyncThunk(
	"task/getCompletedTasks",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get("v1/user/completed-tasks")
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)
export const getNotConfirmedExecutor = createAsyncThunk(
	"task/getNotConfirmedExecuitor",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get(
				"v1/user/special-task-for/employer",
			)
			return response.data.special_task
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const getNotAppliedTasks = createAsyncThunk(
	"task/getNotAppliedTasks",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get("v1/user/not-applied-task")
			return response.data
		} catch (e) {
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)
export const getCauntEmployerTasks = createAsyncThunk(
	"task/getCauntEmployerTasks",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get(
				"v1/user/task-section-count/employer",
			)
			return response.data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const getRespondedTasks = createAsyncThunk(
	"task/getRespondedTasks",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get("v1/user/responded-executor")
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const getInProcessTasks = createAsyncThunk(
	"task/getInProcessTasks",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get("v1/user/in-process-task")
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const selectExecutor = createAsyncThunk(
	"task/selectExecutor",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post(
				"v1/user/select-task-executor",
				data,
			)
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const addTaskMeeting = createAsyncThunk(
	"task/addTaskMeeting",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post(
				"v1/user/meeting-with-responded-executor",
				data,
			)
			return response.data.task[0]
		} catch (err) {}
	},
)

export const finishTask = createAsyncThunk(
	"task/finishTask",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post(
				"v1/user/employer-complate-task",
				data,
			)
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const rejectExecutor = createAsyncThunk(
	"task/rejectExecutor",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post(
				"v1/user/reject-task-executor ",
				data,
			)
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const deleteTask = createAsyncThunk(
	"task/deleteTask",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post(
				`v1/user/task/${data.id}/delete`,
				data.formData,
			)
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue("Что то пошло не так")
		}
	},
)

export const createRating = createAsyncThunk(
	"task/createRating",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post("v1/user/create-reiting", data)
			console.log(response, 'oooooooooooooooooo');
			return response.data
		} catch (e) {
			console.log(e.response, "register error")
			return thunkAPI.rejectWithValue(e.response.message)
		}
	},
)
export const messageToModerator = createAsyncThunk(
	"task/messageToModerator",
	async (data, thunkAPI) => {
		try {
			const response = await instance.post("v1/user/problem-message", data)
			return response.data.tasks
		} catch (err) {
			console.log(err)
			thunkAPI.rejectWithValue("err")
		}
	},
)

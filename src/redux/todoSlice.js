import { nanoid } from 'nanoid';
import Axios from '../app/lib/Axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const makeRequest = async (method, url, body = undefined) => {
	try {
		const { data } = await Axios[method](url, body);
		return data;
	} catch (error) {
		console.error(`Error during ${method.toUpperCase()} method`, error);
	}
};

const updateTodos = (_, action) => action.payload;
const handleActionError = (_, action) =>
	console.error(
		`Error during ${action.type.split('/')[1]}`,
		action.payload.error
	);

export const loadTodosAsync = createAsyncThunk(
	'todos/loadTodosAsync',
	async () => await makeRequest('get', '/todos')
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async title =>
		await makeRequest('post', '/todos', {
			id: nanoid(),
			title,
			completed: false,
		})
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async id => await makeRequest('delete', '/todos', { data: { id } })
);

export const toggleCompletedAsync = createAsyncThunk(
	'todos/toggleCompletedAsync',
	async id => await makeRequest('patch', '/todos', { id })
);

export const clearCompletedAsync = createAsyncThunk(
	'todos/clearCompletedAsync',
	async () => await makeRequest('put', '/todos')
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	extraReducers: builder => {
		builder
			.addCase(loadTodosAsync.fulfilled, updateTodos)
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(deleteTodoAsync.fulfilled, updateTodos)
			.addCase(toggleCompletedAsync.fulfilled, updateTodos)
			.addCase(clearCompletedAsync.fulfilled, updateTodos)
			.addCase(addTodoAsync.rejected, handleActionError)
			.addCase(deleteTodoAsync.rejected, handleActionError)
			.addCase(toggleCompletedAsync.rejected, handleActionError)
			.addCase(clearCompletedAsync.rejected, handleActionError);
	},
});

export default todoSlice.reducer;
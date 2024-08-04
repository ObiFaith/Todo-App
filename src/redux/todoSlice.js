import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../app/lib/Axios';
import { nanoid } from 'nanoid';

export const loadTodosAsync = createAsyncThunk(
	'todos/loadTodosAsync',
	async () => {
		const { data: todos } = await Axios.get('/todos');
		return todos;
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async title => {
		const { data: todo } = await Axios.post('/todos', {
			id: nanoid(),
			title,
			completed: false,
		});
		return todo;
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async id => {
		const { data: todos } = await Axios.delete('/todos', { data: { id } });
		return todos;
	}
);

export const toggleCompletedAsync = createAsyncThunk(
	'todos/toggleCompletedAsync',
	async id => {
		const { data: todos } = await Axios.patch('/todos', { id });
		return todos;
	}
);

export const clearCompletedTodoAsync = createAsyncThunk(
	'todos/clearCompletedTodoAsync',
	async () => {
		const { data: todos } = await Axios.put('/todos');
		return todos;
	}
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todo: {},
		todos: [],
	},
	extraReducers: builder => {
		builder
			.addCase(loadTodosAsync.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(deleteTodoAsync.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(toggleCompletedAsync.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(clearCompletedTodoAsync.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(addTodoAsync.rejected, (_, action) => {
				console.error('Error at addTodoAsync', action.error.message);
			})
			.addCase(deleteTodoAsync.rejected, (_, action) => {
				console.error('Error at deleteTodoAsync', action.error.message);
			})
			.addCase(toggleCompletedAsync.rejected, (_, action) => {
				console.error(
					'Error at toggleCompletedAsync',
					action.error.message
				);
			})
			.addCase(clearCompletedTodoAsync.rejected, (_, action) => {
				console.error(
					'Error at clearCompletedTodoAsync',
					action.error.message
				);
			});
	},
});

export default todoSlice.reducer;

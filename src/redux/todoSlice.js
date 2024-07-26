import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadTodosAsync = createAsyncThunk(
	'todos/loadTodosAsync',
	async () => {
		const { data: todos } = await axios.get(
			'https://jsonplaceholder.typicode.com/todos'
		);
		return todos;
	}
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			state.push({
				id: nanoid(),
				title: action.payload.title,
				completed: false,
			});
		},
		toggleCompleted: (state, action) => {
			const todo = state.find(todo => todo.id === action.payload.id);
			if (todo) todo.completed = !todo.completed;
		},
		deleteTodo: (state, action) =>
			state.filter(todo => todo.id !== action.payload.id),
		resetTodo: () => [],
	},
	extraReducers: builder => {
		builder.addCase(
			loadTodosAsync.fulfilled,
			(_, action) => action.payload
		);
	},
});

export const { addTodo, editTitle, toggleCompleted, deleteTodo, resetTodo } =
	todoSlice.actions;
export default todoSlice.reducer;

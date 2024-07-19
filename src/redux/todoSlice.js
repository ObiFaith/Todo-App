import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const loadTodosAsync = createAsyncThunk('todos/loadTodosAsync', async () => {
  const { data: todos } = await axios.get('https://jsonplaceholder.typicode.com/todos')
  localStorage.setItem('todo', JSON.stringify(todos))
  //const todos = JSON.parse(localStorage.getItem('todo'))
  return todos
})

/* export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (title) => {
  const { data: todo } = await axios.post(`https://jsonplaceholder.typicode.com/todos`, {
    id: nanoid(), title, completed: false
  })
  console.log(todo)
  return todo
}) */

const todoSlice = createSlice({
  name: 'todos',
  initialState: JSON.parse(localStorage.getItem('todo')).sort((a, b) => a.id - b.id),
  reducers: {
    addTodo: (state, action) => {
      state.push({id: nanoid(), title: action.payload.title, completed: false})
    },
    editTitle: (state, action) => {
      let index = state.findIndex(todo => todo.id === action.payload.id)
      state[index].title = action.payload.title
    },
    toggleCompleted: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id)
      if (todo) todo.completed = !todo.completed
    },
    deleteTodo: (state, action) => state.filter(todo => todo.id !== action.payload.id),
    resetTodo: () => [],
  },
  extraReducers: builder => {
    builder
      .addCase(loadTodosAsync.fulfilled, (_, action) => action.payload)
      /* .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.push({id: nanoid(),  title: action.payload, completed: false})
        console.log(action.payload)
      }) */
  }
})

export const { addTodo, editTitle, toggleCompleted, deleteTodo, resetTodo } = todoSlice.actions
export default todoSlice.reducer
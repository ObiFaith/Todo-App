'use client'
import { icon_add, icon_moon } from "@/public";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs, TodoList } from "..";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, loadTodosAsync } from "../redux/todoSlice";
import Pagination from "../components/Pagination";

export default function Home() {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const todos = useSelector(state => state.todos)

  const itemsPerPage = 10;
  const [pageNo, setPageNo] = useState(1);
  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
	const paginatedTodos = todos.slice(startIndex, endIndex);
	const maxPageNo = Math.ceil(todos.length / itemsPerPage);
  const completedTodos = paginatedTodos.filter(todo => todo.completed)
  const activeTodos = paginatedTodos.filter(todo => !todo.completed)

   useEffect(() => {
    dispatch(loadTodosAsync())
  }, [])

  return (<>
    <Head>
      <title>Todo App</title>
    </Head>
    <main className="relative">
      <div className="bg-image pt-10 pb-20 px-8">
        <div className="flex items-center pb-10 container justify-between text-white">
          <h1 className="text-2xl tracking-[1rem]">TODO</h1>
          <div>
            <Image width={20} height={20} src={icon_moon} alt="toggle for dark theme" />
          </div>
        </div>
        <div className="flex container gap-4 justify-between bg-white items-center px-6 text-base py-3 rounded-lg w-full">
          <div className="flex gap-2 w-full items-center">
            <span className="border border-light-blue-300 p-2 rounded-full text-center"></span>
            <div className="w-full">
              <input value={input} onChange={e => setInput(e.target.value)}
                className="w-full outline-none pt-1 placeholder:text-light-blue-400" type="text" placeholder="Create a new todo..."
              />
            </div>
          </div>
          <span className="text-light-blue-400 cursor-pointer"
            onClick={() => { dispatch(addTodo({title: input})); setInput('') }}
          >
            <Image src={icon_add} alt="add icon" width={16} height={16} />
          </span>
        </div>
      </div>
      <div className="px-8">
        <Tabs length={activeTodos.length} config={[
          {header: 'All', component: <TodoList setInput={setInput} input={input} todos={paginatedTodos} />},
          {header: 'Active', component: <TodoList setInput={setInput} input={input} todos={activeTodos} />},
          {header: 'Completed', component: <TodoList setInput={setInput} input={input} todos={completedTodos} />},
        ]}/>
      </div>
      {todos.length > itemsPerPage && <Pagination pageNo={pageNo} setPageNo={setPageNo} maxPageNo={maxPageNo} />}
    </main>
  </>);
}
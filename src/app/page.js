'use client';
import Image from 'next/image';
import ThemeState from '../ThemeProvider';
import { useEffect, useState } from 'react';
import { Tabs, TodoList, Pagination } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, loadTodosAsync } from '../redux/todoSlice';
import { icon_add, icon_add_dark, icon_moon, icon_sun } from '@/public';

export default function Home() {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');
	const todos = useSelector(state => state.todos);
	const { darkMode, setDarkMode } = ThemeState();

	useEffect(() => {
		dispatch(loadTodosAsync());
	}, [dispatch]);

	const itemsPerPage = 10;
	const [pageNo, setPageNo] = useState(1);
	const startIndex = (pageNo - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedTodos = todos.slice(startIndex, endIndex);
	const maxPageNo = Math.ceil(todos.length / itemsPerPage);
	const completedTodos = paginatedTodos.filter(todo => todo.completed);
	const activeTodos = paginatedTodos.filter(todo => !todo.completed);

	return (
		<main className="relative">
			<div
				className={`bg-cover bg-no-repeat pt-10 pb-20 px-8 ${
					darkMode
						? 'bg-mobile-dark sm:bg-desktop-dark'
						: 'bg-mobile-light sm:bg-desktop-light'
				}`}
			>
				<div className="flex items-center pb-10 container justify-between text-white">
					<h1 className="text-2xl tracking-[1rem]">TODO</h1>
					<div className='cursor-pointer' onClick={() => setDarkMode(prevMode => !prevMode)}>
						<Image
							width={20}
							height={20}
							src={darkMode ? icon_sun : icon_moon}
							alt="toggle for dark theme"
						/>
					</div>
				</div>
				<div
					className={`flex container gap-4 justify-between items-center px-4 sm:px-6 text-base py-3 rounded-lg w-full ${
						darkMode ? 'bg-dark-blue-200' : 'bg-white'
					}`}
				>
					<div className="flex gap-2 w-full items-center">
						<span
							className={`border p-2 rounded-full text-center ${
								darkMode
									? 'border-dark-blue-500'
									: 'border-light-blue-300 '
							}`}
						></span>
						<div className="w-full">
							<input
								value={input}
								onChange={e => setInput(e.target.value)}
								className={`w-full outline-none pt-1 placeholder:text-light-blue-400 ${
									darkMode
										? 'text-light-blue-100 bg-dark-blue-200'
										: 'text-light-blue-500'
								}`}
								type="text"
								placeholder="Create a new todo..."
							/>
						</div>
					</div>
					<span
						className="text-light-blue-400 cursor-pointer"
						onClick={() => {
							dispatch(addTodoAsync(input));
							setInput('');
						}}
					>
						{input && (
							<Image
								src={darkMode ? icon_add_dark : icon_add}
								alt="add icon"
								width={16}
								height={16}
							/>
						)}
					</span>
				</div>
			</div>
			{todos.length > 0 ? (
				<>
					<div className="px-8">
						<Tabs
							length={activeTodos.length}
							config={[
								{
									header: 'All',
									component: (
										<TodoList
											setInput={setInput}
											todos={paginatedTodos}
										/>
									),
								},
								{
									header: 'Active',
									component: (
										<TodoList
											setInput={setInput}
											todos={activeTodos}
										/>
									),
								},
								{
									header: 'Completed',
									component: (
										<TodoList
											setInput={setInput}
											todos={completedTodos}
										/>
									),
								},
							]}
						/>
					</div>
					{todos.length > itemsPerPage && (
						<Pagination
							pageNo={pageNo}
							setPageNo={setPageNo}
							maxPageNo={maxPageNo}
						/>
					)}
				</>
			) : (
				<div className='text-center py-8'>Loading</div>
			)}
		</main>
	);
}

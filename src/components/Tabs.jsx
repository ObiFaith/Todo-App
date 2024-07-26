import { useState } from 'react';
import { TabList } from '..';
import { useDispatch } from 'react-redux';
import { resetTodo } from '../redux/todoSlice';
import { useSelector } from 'react-redux';
import ThemeState from '../ThemeProvider';

const Tabs = ({ config, length }) => {
	const dispatch = useDispatch();
	const { darkMode } = ThemeState();
	const [activeTab, setActiveTab] = useState(0);
	const todos = useSelector(state => state.todos);
	return (
		<>
			<div
				className={`rounded-lg container relative -top-10 ${
					darkMode ? 'dark:bg-dark-blue-200' : 'bg-white shadow-sm'
				}`}
			>
				{config[activeTab].component}
				<div className="flex items-center cursor-pointer px-6 py-4 justify-between text-sm text-light-blue-400">
					<p className="cursor-text">
						{length} item{length > 1 ? 's' : ''} left
					</p>
					<TabList
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						config={config}
						className="max-sm:hidden"
					/>
					<p
						className="hover:text-dark-blue-300"
						onClick={() => dispatch(resetTodo())}
					>
						Clear completed
					</p>
				</div>
			</div>
			{todos.length > 0 && (
				<TabList
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					config={config}
					className="cursor-pointer px-6 py-4 rounded-lg justify-center sm:hidden"
				/>
			)}
		</>
	);
};

export default Tabs;

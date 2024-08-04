import { TodoItem } from '..';
import ThemeState from '../ThemeProvider';

const TodoList = ({ todos, setInput }) => {
	const { darkMode } = ThemeState();
	return (
		<div
			className={`sm:rounded-b-none transition-all rounded-md ${
				darkMode ? 'bg-dark-blue-200' : 'bg-white'
			}`}
		>
			{todos.map((todo, index) => (
				<TodoItem
					setInput={setInput}
					key={index}
					{...todo}
				/>
			))}
		</div>
	);
};

export default TodoList;

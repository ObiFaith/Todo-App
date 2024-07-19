import { TodoItem } from ".."

const TodoList = ({todos}) => {
  return (
    <div className="sm:rounded-b-none transition-all rounded-md bg-white">
      {todos.map((todo, index) =>
        <TodoItem key={index} {...todo}
          className={index === todos.length - 1 ? 'max-sm:border-b-0' : ''}
        />
      )}
    </div>
  )
}

export default TodoList
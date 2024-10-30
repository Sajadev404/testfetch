import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  if (!Array.isArray(todos)) {
    console.error('Expected todos to be an array');
    return null; // O un mensaje alternativo
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={todo.id || index} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

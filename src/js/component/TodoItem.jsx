import React from 'react';

const TodoItem = ({ todo }) => {
  if (!todo || !todo.thumbnail) {
    return null; // Manejo de errores si el objeto no está completo
  }

  return (
    <li>
      <h3>{todo.name}</h3>
      <img src={`${todo.thumbnail.path}.${todo.thumbnail.extension}`} alt={todo.name} />
    </li>
  );
};

export default TodoItem;

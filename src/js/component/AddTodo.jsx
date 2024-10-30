import React, { useState } from 'react';

const AddTodo = ({ characters, addTodo }) => {
  const [selectedCharacter, setSelectedCharacter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const character = characters.find(c => c.name === selectedCharacter);
    if (character) {
      addTodo(character);
      setSelectedCharacter('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
        <option value="">Seleciona el personaje</option>
        {characters.map(character => (
          <option key={character.id} value={character.name}>{character.name}</option>
        ))}
      </select>
      <button type="submit">Add to To-Do List</button>
    </form>
  );
};

export default AddTodo;

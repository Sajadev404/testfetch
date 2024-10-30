import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import md5 from 'md5';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [letter, setLetter] = useState(''); // Estado para almacenar la letra ingresada

  useEffect(() => {
    const fetchCharacters = () => {
      const publicKey = '758ce2d397e46b0f8cc647386b698a07'; // Reemplaza con tu clave pública
      const privateKey = 'aff9968b9d78353ac33602a6f735f53c76084209'; // Reemplaza con tu clave privada
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey);

      fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${letter}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCharacters(data.data.results);
        })
        .catch((error) => {
          console.error('Error fetching characters:', error);
        });
    };

    if (letter) {
      fetchCharacters();
    }
  }, [letter]);

  const addTodo = (character) => setTodos((prevTodos) => [...prevTodos, character]);

  const searchletter = (e) => {
    setLetter(e.target.value); // Actualiza la letra ingresada
  };

  return (
    <div>
      <h1>Marvel To-Do List</h1>
      <input
        type="text"
        placeholder="Enter letter"
        value={letter}
        onChange={searchletter}
      />
      <AddTodo characters={characters} addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;

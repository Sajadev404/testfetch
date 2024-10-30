import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/Todolist';
import AddTodo from './components/AddTodo';
import md5 from 'md5';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = '758ce2d397e46b0f8cc647386b698a07';
      const privateKey = 'aff9968b9d78353ac33602a6f735f53c76084209';
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        console.log(response.data.data.results); // Verifica los datos
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const addTodo = (character) => {
    setTodos((prevTodos) => [...prevTodos, character]);
  };

  return (
    <div>
      <h1>Marvel To-Do List</h1>
      <AddTodo characters={characters} addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;

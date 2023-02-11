import React, { useState, useEffect } from 'react';
import styles from './Todo.module.css';
import Background from './background';

export const Todo = ({ setPage }) => {
  const [todos, setTodos] = useState([]);
  const [pushTodo, setPushTodo] = useState('');
  const [description] = useState(pushTodo)

  useEffect(() => {
    async function fetchTodos() {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setPage(0);
        return;
      }
      try {
        const response = await fetch('http://localhost:8080/api/todo/getAllTodos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    setTodos([...todos, { description: pushTodo }]);
    const token = localStorage.getItem('jwt');
    if (!token) {
      setPage(0);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/todo/addNewTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Background />
      <div className={styles.addNote}>
        <input
          className={styles.noteInput}
          type="text"
          placeholder="Enter todo"
          onChange={(event) => setPushTodo(event.target.value)}
        />
        <button className={styles.addBtn} onClick={() => addTodo()}>
          ADD
        </button>
      </div>

      <div className={styles.boxes}>
        {todos.map((todo) => (
          <div className={styles.box1} key={todo.id}>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

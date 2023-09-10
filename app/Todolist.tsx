"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { AiTwotoneDelete, AiTwotoneEdit} from "react-icons/ai";

type Props = {}

const Todolist: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  
  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditedText(todos[index].text);
  };

  const stopEditing = () => {
    setEditIndex(null);
  };

  const updateTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].text = editedText;
    setTodos(newTodos);
    stopEditing();
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center my-2 p-4 text-blue-500 bg-sky-200 w-full border-4 border-white rounded-md">
            {editIndex === index ? (
              <div className='flex flex-row items-center justify-end'>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  className="text-green-500 ml-2"
                  onClick={() => updateTodo(index)}
                >
                  Save
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={stopEditing}
                >
                  Cancle
                </button>
              </div>
            ) : (
              <div className='flex flex-row items-center justify-end'>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                  />
                  <span className={`${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <div className='flex flex-row gap-4 ml-[13rem]'>
                  <AiTwotoneEdit size={"25px"} onClick={() => startEditing(index)} />
                  <AiTwotoneDelete 
                    onClick={() => removeTodo(index)}
                    size={'25px'}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todolist;
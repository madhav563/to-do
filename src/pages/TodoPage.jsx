import React, {useEffect, useState } from 'react'
import '../css/todoPage.css'
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const Todo = () => {
  const[todo, setTodo] = useState("");
  const[todos, setTodos] = useState([]);
  const[editId, setEditId] = useState(0);
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  
  useEffect(() => {
    if(!user){
        navigate("/login");
        return;
    }

    api
        .get("/todos")
        .then((res)=> setTodos(res.data))
        .catch(() => logout());
  }, []);
  
  const handleDelete = async (id) =>{
    try {
        await api.delete(`/todos/${id}`);
        setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
        alert('Failed to delete todo');
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo.trim()) return;
    
    if(editId){
        try{
            await api.put(`/todos/${editId}`, { text: todo });
            setTodos(
                todos.map((t) => 
                  t.id === editId ? {...t,text:todo}:t
            )
        );
        setEditId(0);
        setTodo("");
        } catch (err) {
            alert('Error updating todo');
        }
        return;
    }

    try {
        const res = await api.post('/todos', {text: todo});
        setTodos([res.data, ...todos]);
        setTodo("");
    } catch (err) {
        alert('error adding todo')
    }  
    };
    

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    if (editTodo) {
        setTodo(editTodo.text);
        setEditId(id);
      }
  };

  return (
    <>
    <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>
  Logout
</button>
    <div className='App'>
      <div className='todo-container'>
        <h1>Todo List App</h1>
        <form className='todo-form' onSubmit={handleSubmit}>
          <input type = "text" 
          value = {todo}
          placeholder="Enter a todo"
          onChange={(e) => setTodo(e.target.value)}
          />
          <button type='submit'> {editId? "Edit" : "Add"}</button>
        </form>
        <ul className='allTodos'>
          {
            todos.map((t) => (
          
          <li className="singleToDo">
            <span className="todoText" key = {t.id}>{t.text}</span>
            <button onClick={() => handleEdit(t.id)}>Edit</button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
          ))}
        </ul>
        <div className="header">
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Todo;

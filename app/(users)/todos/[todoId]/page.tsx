import { notFound } from "next/navigation"
import React from 'react';
import './todoItem.scss'

export const dynamicParams=true;

const fetchTodo=async(id:any)=>{
  const res=await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{next:{revalidate:60}})
  const todo=await res.json()
  return todo;
}

const TodoPage = async({params}:any) => {
    const todo=await fetchTodo(params.todoId)
    if(!todo.id) return notFound();
    return (
        <div className="todo-card">
            <p className="todo-card__number">Todo Number: {todo?.id}</p>
            <h4 className="todo-card__title">{todo?.title}</h4>
            <p className="todo-card__user">Created by: {todo?.userId}</p>
        </div>
    );
};

export default TodoPage;

export const generateStaticParams=async()=>{
    const res=await fetch('https://jsonplaceholder.typicode.com/todos')
    const todos=await res.json()
    const trimmedTodos=todos.splice(0,10)
    return trimmedTodos.map((todo:any)=>({
     todoId:todo.id.toString()
    }))
}
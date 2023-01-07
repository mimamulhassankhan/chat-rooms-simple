import Link from 'next/link';
import React from 'react';
import './todoList.scss'
const fetchTodos=async()=>{
    
    // const timeOut=Math.floor(Math.random() * 5 +1)*1000;
    // await new Promise((resolve)=>setTimeout(resolve,timeOut));

  const res=await fetch('https://jsonplaceholder.typicode.com/todos')
  const todos=await res.json()
  return todos;
}

const TodoList = async () => {
    const todos=await fetchTodos()
    return (
        <div>
            {
                todos.map((todo:any,i:number)=><p className='todoList'><Link className='todoList__link' href={`/todos/${todo.id}`}>Todo: {todo?.id}</Link></p>)
            }
        </div>
    );
};

export default TodoList;
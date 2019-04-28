import React from 'react';
import { useObservable } from 'rxjs-hooks';


import Todo from './components/todo-item/TodoItem';
import InputEditor from './components/input-editor/InputEditor';

import TodoService from "./one77/todo.js";


const App: React.FC = () => {
  const todos: any = useObservable(() => TodoService.getTodos(), []);
  console.log('todos', todos);
  // const remote: any = useObservable(() => TodoService.getRemoteTodos(), []);
  return (
    <div className="App">
      <InputEditor ></InputEditor>
      {todos.map((todo: any) => {
        console.log('todo', { todo })
        const _todo = Object.assign({}, todo);
        return <Todo key={`${_todo.id}+${+ new Date()}`} id={_todo.id} content={_todo.content} isComplete={_todo.isComplete} onToggle={() => TodoService.toggle(_todo.id)}></Todo>
      })}
    </div>
  );
}

export default App;

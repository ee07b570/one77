import React from 'react';
import { useObservable } from 'rxjs-hooks';


import Todo from './components/todo-item/TodoItem';
import InputEditor from './components/input-editor/InputEditor';

import TodoService from "./one77/todo.js";


const App: React.FC = () => {
  const todos: any = useObservable(() => TodoService.getTodos(), []);
  const remote: any = useObservable(() => TodoService.getRemoteTodos(), []);
  return (
    <div className="App">
      <InputEditor ></InputEditor>
      {todos.map((todo: any) => {
        return <Todo key={todo.id} id={todo.id} content={todo.content} isComplete={todo.isComplete}></Todo>
      })}
    </div>
  );
}

export default App;

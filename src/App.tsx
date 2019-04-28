import React, { useState, useEffect, useRef } from 'react';
// import { useObservable } from 'rxjs-hooks';

import Todo from './components/todo-item/TodoItem';
import InputEditor from './components/input-editor/InputEditor';

import TodoService from "./one77/todo.js";

function useObservable(observable: any, initialState: any) {
  const [state, setstate] = useState(initialState);
  useEffect(() => {
    observable.subscribe((value: any) => {
      setstate(value);
    })
    return () => {
      observable.unsubscribe();
    };
  }, [])
  return state;
}


const App: React.FC = () => {
  const todos: any = useObservable(TodoService.getTodos(), []);
  console.log('todos', todos);
  // const remote: any = useObservable(() => TodoService.getRemoteTodos(), []);

  return (
    <_APP todos={todos}></_APP>
  );
}

const _APP: any = (props: any) => {
  return (
    <div className="App">
      <InputEditor ></InputEditor>
      {props.todos.map((todo: any) => {
        console.log('todo', { todo })
        const _todo = Object.assign({}, todo);
        return <Todo key={`${_todo.id}+${+ new Date()}`} id={_todo.id} content={_todo.content} isComplete={_todo.isComplete} onToggle={() => TodoService.toggle(_todo.id)}></Todo>
      })}
    </div>
  )
}

// interface props {

// }

// class App extends React.Component<props, object> {
//   public state: any;
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       todos: []
//     }
//   }
//   componentDidMount() {
//     TodoService.getTodos().subscribe((todos: any) => {
//       this.setState({
//         todos
//       })
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         <InputEditor ></InputEditor>
//         {this.state.todos.map((todo: any) => {
//           console.log('todo', { todo })
//           const _todo = Object.assign({}, todo);
//           return <Todo key={`${_todo.id}+${+ new Date()}`} id={_todo.id} content={_todo.content} isComplete={_todo.isComplete} onToggle={() => TodoService.toggle(_todo.id)}></Todo>
//         })}
//       </div>
//     );
//   }
  
// }

export default App;

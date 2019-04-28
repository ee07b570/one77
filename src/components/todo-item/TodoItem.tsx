import React from 'react';

interface TodoProps {
  id: string,
  content: string,
  isComplete: boolean,
  onToggle: () => void
}

const TodoItem = (props: TodoProps) => {
  console.log('ddd', props)
  return (
    <div className="todo-item">
      <span>{props.content}</span>----<span onClick={props.onToggle}>{props.isComplete.toString()}</span>
    </div>
  );
}

export default TodoItem;

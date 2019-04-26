import React from 'react';

interface TodoProps {
  id: string,
  content: string,
  isComplete: boolean
}

const TodoItem = (props: TodoProps) => {
  return (
    <div className="todo-item">
      <span>{props.content}</span>----<span>{props.isComplete.toString()}</span>
    </div>
  );
}

export default TodoItem;

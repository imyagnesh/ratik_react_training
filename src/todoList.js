import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoList = ({
  todoList,
  completeTodo,
  deleteTodo,
}) => {
  console.log('render TodoList');
  return (
    <div>
      {todoList.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.isDone}
            onChange={() => completeTodo(item)}
          />
          <span
            style={{
              textDecoration: item.isDone
                ? 'line-through'
                : 'none',
            }}
          >
            {item.todoText}
          </span>
          <button
            type="button"
            onClick={() => deleteTodo(item)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(Object).isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);

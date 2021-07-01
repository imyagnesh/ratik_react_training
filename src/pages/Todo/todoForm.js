import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log('render TodoForm');
  return (
    <form onSubmit={addTodo}>
      <input type="text" ref={ref} required />
      <button type="submit">Add Todo</button>
    </form>
  );
});

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

TodoForm.displayName = 'TodoForm';

export default memo(TodoForm, () => {
  console.log('hello');
  return true;
});

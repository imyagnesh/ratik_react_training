import React, { useEffect } from 'react';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';

import useApiCall from '../../hooks/useApiCall';

const TodoApp = () => {
  const {
    addTodo,
    filter,
    deleteTodo,
    completeTodo,
    fetchData,
    loading,
    error,
    todoList,
    txtInput,
  } = useApiCall();

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    if (error.message === 'timeout') {
      return (
        <div>
          <button type="button" onClick={fetchData}>
            Try Again
          </button>
        </div>
      );
    }
    return (
      <h1 data-testid="error-header">{error.message}</h1>
    );
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} ref={txtInput} />
      <TodoList
        todoList={todoList}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
      <TodoFilter onFilter={filter} />
    </div>
  );
};

export default TodoApp;

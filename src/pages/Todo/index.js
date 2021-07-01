import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';
import axios from '../../utils/axios';

const initialState = {
  loading: false,
  todoList: [],
  error: null,
};

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'TODO_FETCH_REQUEST':
    case 'TODO_ADD_REQUEST':
    case 'TODO_UPDATE_REQUEST':
      return { ...state, loading: true };

    case 'TODO_FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        todoList: payload,
      };

    case 'TODO_ADD_SUCCESS':
      return {
        ...state,
        loading: false,
        todoList: [...state.todoList, payload],
      };

    case 'TODO_UPDATE_SUCCESS': {
      const index = state.todoList.findIndex(
        (x) => x.id === payload.id,
      );
      const updateTodoList = [
        ...state.todoList.slice(0, index),
        payload,
        ...state.todoList.slice(index + 1),
      ];
      return {
        ...state,
        loading: false,
        todoList: updateTodoList,
      };
    }

    case 'TODO_FETCH_FAIL':
    case 'TODO_ADD_FAIL':
    case 'TODO_UPDATE_FAIL':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

const TodoApp = () => {
  const [{ loading, error, todoList }, dispatch] =
    useReducer(todoReducer, initialState);
  const txtInput = useRef();

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      dispatch({
        type: 'TODO_ADD_REQUEST',
      });
      const todoText = txtInput.current.value;
      const res = await axios.post('todoList', {
        todoText,
        isDone: false,
      });
      dispatch({
        type: 'TODO_ADD_SUCCESS',
        payload: res.data,
      });
      txtInput.current.value = '';
    } catch (err) {
      dispatch({
        type: 'TODO_ADD_FAIL',
        payload: err,
      });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: 'TODO_FETCH_REQUEST' });
      const res = await axios.get('todoList');
      dispatch({
        type: 'TODO_FETCH_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'TODO_FETCH_FAIL',
        payload: err,
      });
    }
  }, []);

  const completeTodo = async (item) => {
    try {
      dispatch({ type: 'TODO_UPDATE_REQUEST' });
      const res = await axios.put(`todoList/${item.id}`, {
        ...item,
        isDone: !item.isDone,
      });
      dispatch({
        type: 'TODO_UPDATE_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'TODO_UPDATE_FAIL',
        payload: err,
      });
    }
  };

  const deleteTodo = async (item) => {
    //   try {
    //     setLoading(true);
    //     await axios.delete(`todoList/${item.id}`);
    //     const index = todoList.findIndex(
    //       (x) => x.id === item.id,
    //     );
    //     const updatedTodos = [
    //       ...todoList.slice(0, index),
    //       ...todoList.slice(index + 1),
    //     ];
    //     setTodoList(updatedTodos);
    //     setLoading(false);
    //   } catch (err) {
    //     setLoading(false);
    //     setError(err);
    //   }
  };

  const filter = useCallback(async (ft) => {
    // try {
    //   setLoading(true);
    //   const params = {};
    //   if (ft !== 'all') {
    //     params.isDone = ft === 'completed';
    //   }
    //   const res = await axios.get('todoList', {
    //     params,
    //   });
    //   setLoading(false);
    //   setTodoList(res.data);
    // } catch (err) {
    //   setLoading(false);
    //   setError(err);
    // }
  }, []);

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

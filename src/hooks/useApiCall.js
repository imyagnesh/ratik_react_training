import { useCallback, useReducer, useRef } from 'react';
import {
  initialState,
  todoReducer,
} from '../reducers/todoReducer';
import axios from '../utils/axios';

const useApiCall = () => {
  const [{ loading, error, todoList }, dispatch] =
    useReducer(todoReducer, initialState);

  const txtInput = useRef();

  const addTodo = useCallback(async (event) => {
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
  }, []);

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

  const completeTodo = useCallback(async (item) => {
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
  }, []);

  const deleteTodo = useCallback(async (item) => {
    try {
      dispatch({ type: 'TODO_DELETE_REQUEST' });
      await axios.delete(`todoList/${item.id}`);
      dispatch({
        type: 'TODO_DELETE_SUCCESS',
        payload: item,
      });
    } catch (err) {
      dispatch({
        type: 'TODO_DELETE_FAIL',
        payload: err,
      });
    }
  }, []);

  const filter = useCallback(async (ft) => {
    try {
      dispatch({ type: 'TODO_FETCH_REQUEST' });
      const params = {};
      if (ft !== 'all') {
        params.isDone = ft === 'completed';
      }
      const res = await axios.get('todoList', {
        params,
      });
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

  return {
    addTodo,
    filter,
    deleteTodo,
    completeTodo,
    fetchData,
    loading,
    error,
    todoList,
    txtInput,
  };
};

export default useApiCall;

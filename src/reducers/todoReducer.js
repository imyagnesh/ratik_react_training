export const initialState = {
  loading: false,
  todoList: [],
  error: null,
};

export const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'TODO_FETCH_REQUEST':
    case 'TODO_ADD_REQUEST':
    case 'TODO_UPDATE_REQUEST':
    case 'TODO_DELETE_REQUEST':
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

    case 'TODO_DELETE_SUCCESS': {
      const index = state.todoList.findIndex(
        (x) => x.id === payload.id,
      );
      const updateTodoList = [
        ...state.todoList.slice(0, index),
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
    case 'TODO_DELETE_FAIL':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

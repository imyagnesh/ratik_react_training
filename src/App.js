import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from 'react';
import axios from './utils/axios';
import TodoFilter from './todoFilter';
import TodoList from './todoList';
import TodoForm from './todoForm';

// you cant use following life cycle method in hooks

// 1. snapshotbeforUpdate -> Update
// 2. gerDerivedStateFromError -> Error
// 3. componentDidCatch -> Error

const TodoApp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const txtInput = useRef();

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const todoText = txtInput.current.value;
      const res = await axios.post('todoList', {
        todoText,
        isDone: false,
      });
      setTodoList([...todoList, res.data]);
      setLoading(false);
      txtInput.current.value = '';
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('todoList');
      setTodoList(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  const completeTodo = async (item) => {
    try {
      setLoading(true);

      const res = await axios.put(`todoList/${item.id}`, {
        ...item,
        isDone: !item.isDone,
      });

      const index = todoList.findIndex(
        (x) => x.id === item.id,
      );

      const updateTodoList = [
        ...todoList.slice(0, index),
        res.data,
        ...todoList.slice(index + 1),
      ];

      setTodoList(updateTodoList);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const deleteTodo = async (item) => {
    try {
      setLoading(true);
      await axios.delete(`todoList/${item.id}`);
      const index = todoList.findIndex(
        (x) => x.id === item.id,
      );
      const updatedTodos = [
        ...todoList.slice(0, index),
        ...todoList.slice(index + 1),
      ];

      setTodoList(updatedTodos);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const filter = useCallback(async (ft) => {
    try {
      setLoading(true);
      const params = {};
      if (ft !== 'all') {
        params.isDone = ft === 'completed';
      }
      const res = await axios.get('todoList', {
        params,
      });
      setLoading(false);
      setTodoList(res.data);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
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
    return <h1>{error.message}</h1>;
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

// 1. reduce coding efforts
// 2. inbuilt functionality

// 1. function component is only for UI
// cant use state, methods inside function component

// React 16.8 -> Hooks

// 1. reduce codding efforts
// 2. reduce bundle size
// 3. you can write methods and state & lifecycle in function component

// class TodoApp extends Component {
//   state = {
//     todoList: [],
//     loading: false,
//     error: null,
//   };

//   txtInput = createRef();

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = async () => {
//     try {
//       this.setState({
//         loading: true,
//       });
//       const res = await axios.get('todoList');
//       this.setState({
//         todoList: res.data,
//         loading: false,
//       });
//     } catch (error) {
//       console.log(JSON.stringify(error));
//       this.setState({
//         loading: false,
//         error,
//       });
//     }
//   };

//   addTodo = async (event) => {
//     event.preventDefault();
//     try {
//       this.setState({
//         loading: true,
//       });

//       const todoText = this.txtInput.current.value;

//       const res = await axios.post('todoList', {
//         todoText,
//         isDone: false,
//       });

//       const { todoList } = this.state;

//       this.setState(
//         {
//           todoList: [...todoList, res.data],
//           loading: false,
//         },
//         () => {
//           this.txtInput.current.value = '';
//         },
//       );
//     } catch (error) {
//       this.setState({
//         loading: false,
//         error,
//       });
//     }
//   };

//   completeTodo = async (item) => {
//     try {
//       this.setState({
//         loading: true,
//       });

//       const res = await axios.put(`todoList/${item.id}`, {
//         ...item,
//         isDone: !item.isDone,
//       });

//       const { todoList } = this.state;
//       const index = todoList.findIndex(
//         (x) => x.id === item.id,
//       );

//       const updateTodoList = [
//         ...todoList.slice(0, index),
//         res.data,
//         ...todoList.slice(index + 1),
//       ];

//       this.setState({
//         todoList: updateTodoList,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({
//         loading: false,
//         error,
//       });
//     }
//   };

//   deleteTodo = async (item) => {
//     try {
//       this.setState({
//         loading: true,
//       });
//       await axios.delete(`todoList/${item.id}`);
//       const { todoList } = this.state;
//       const index = todoList.findIndex(
//         (x) => x.id === item.id,
//       );
//       const updatedTodos = [
//         ...todoList.slice(0, index),
//         ...todoList.slice(index + 1),
//       ];

//       this.setState({
//         todoList: updatedTodos,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({
//         loading: false,
//         error,
//       });
//     }
//   };

//   // filterTodo = () => {
//   //   const { todoList, filterType } = this.state;
//   //   return todoList.filter((todo) => {
//   //     switch (filterType) {
//   //       case 'pending':
//   //         return !todo.isDone;
//   //       case 'completed':
//   //         return todo.isDone;
//   //       default:
//   //         return true;
//   //     }
//   //   });
//   // };

//   render() {
//     const { loading, error, todoList } = this.state;

//     if (loading) {
//       return <h1>Loading...</h1>;
//     }

//     if (error) {
//       if (error.message === 'timeout') {
//         return (
//           <div>
//             <button type="button" onClick={this.fetchData}>
//               Try Again
//             </button>
//           </div>
//         );
//       }
//       return <h1>{error.message}</h1>;
//     }

//     return (
//       <div>
//         <h1>Todo App</h1>
//         <form onSubmit={this.addTodo}>
//           <input type="text" ref={this.txtInput} required />
//           <button type="submit">Add Todo</button>
//         </form>
//         <TodoList
//           todoList={todoList}
//           completeTodo={this.completeTodo}
//           deleteTodo={this.deleteTodo}
//         />
//         <TodoFilter
//           onFilter={async (ft) => {
//             try {
//               const params = {};
//               if (ft !== 'all') {
//                 params.isDone = ft === 'completed';
//               }
//               const res = await axios.get('todoList', {
//                 params,
//               });

//               this.setState({
//                 todoList: res.data,
//               });
//             } catch (err) {
//               this.setState({
//                 loading: false,
//                 error: err,
//               });
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }

export default memo(TodoApp);

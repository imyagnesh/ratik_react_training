import React, { Component, createRef } from 'react';
import TodoFilter from './todoFilter';
import TodoList from './todoList';

class TodoApp extends Component {
  state = {
    todoList: [],
    loading: false,
    error: null,
  };

  txtInput = createRef();

  async componentDidMount() {
    try {
      this.setState({
        loading: true,
      });
      const res = await fetch(
        'http://localhost:8080/todoList',
      );
      const json = await res.json();
      this.setState({
        todoList: json,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  }

  addTodo = async (event) => {
    event.preventDefault();
    try {
      this.setState({
        loading: true,
      });

      const todoText = this.txtInput.current.value;

      const res = await fetch(
        'http://localhost:8080/todoList',
        {
          method: 'POST',
          body: JSON.stringify({
            todoText,
            isDone: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await res.json();

      const { todoList } = this.state;

      this.setState(
        {
          todoList: [...todoList, json],
          loading: false,
        },
        () => {
          this.txtInput.current.value = '';
        },
      );
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  };

  completeTodo = async (item) => {
    try {
      this.setState({
        loading: true,
      });

      const res = await fetch(
        `http://localhost:8080/todoList/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...item,
            isDone: !item.isDone,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await res.json();

      const { todoList } = this.state;
      const index = todoList.findIndex(
        (x) => x.id === item.id,
      );

      const updateTodoList = [
        ...todoList.slice(0, index),
        json,
        ...todoList.slice(index + 1),
      ];

      this.setState({
        todoList: updateTodoList,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  };

  deleteTodo = async (item) => {
    try {
      this.setState({
        loading: true,
      });
      await fetch(
        `http://localhost:8080/todoList/${item.id}`,
        {
          method: 'DELETE',
        },
      );
      const { todoList } = this.state;
      const index = todoList.findIndex(
        (x) => x.id === item.id,
      );
      const updatedTodos = [
        ...todoList.slice(0, index),
        ...todoList.slice(index + 1),
      ];

      this.setState({
        todoList: updatedTodos,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  };

  // filterTodo = () => {
  //   const { todoList, filterType } = this.state;
  //   return todoList.filter((todo) => {
  //     switch (filterType) {
  //       case 'pending':
  //         return !todo.isDone;
  //       case 'completed':
  //         return todo.isDone;
  //       default:
  //         return true;
  //     }
  //   });
  // };

  render() {
    const { loading, error, todoList } = this.state;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (error) {
      return <h1>{error.message}</h1>;
    }

    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={this.addTodo}>
          <input type="text" ref={this.txtInput} required />
          <button type="submit">Add Todo</button>
        </form>
        <TodoList
          todoList={todoList}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter
          onFilter={async (ft) => {
            try {
              let query = '';
              if (ft === 'pending') {
                query = '?isDone=false';
              }
              if (ft === 'completed') {
                query = '?isDone=true';
              }
              const res = await fetch(
                `http://localhost:8080/todoList${query}`,
              );
              const json = await res.json();

              this.setState({
                todoList: json,
              });
            } catch (err) {
              this.setState({
                loading: false,
                error: err,
              });
            }
          }}
        />
      </div>
    );
  }
}

export default TodoApp;

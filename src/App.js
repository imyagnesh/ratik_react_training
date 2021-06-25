import React, { Component, createRef } from 'react';
import TodoFilter from './todoFilter';
import TodoList from './todoList';

class TodoApp extends Component {
  state = {
    todoList: [],
    filterType: 'all',
  };

  txtInput = createRef();

  async componentDidMount() {
    try {
      const res = await fetch(
        'http://localhost:8080/todoList',
      );
      const json = await res.json();
      this.setState({
        todoList: json,
      });
    } catch (error) {}
  }

  addTodo = (event) => {
    event.preventDefault();

    const { todoList } = this.state;

    const todoText = this.txtInput.current.value;

    this.setState(
      {
        todoList: [
          ...todoList,
          {
            id: new Date().valueOf(),
            todoText,
            isDone: false,
          },
        ],
        filterType: 'all',
      },
      () => {
        this.txtInput.current.value = '';
      },
    );
  };

  completeTodo = (item) => {
    const { todoList } = this.state;
    const index = todoList.findIndex(
      (x) => x.id === item.id,
    );

    const updateTodoList = [
      ...todoList.slice(0, index),
      { ...item, isDone: !item.isDone },
      ...todoList.slice(index + 1),
    ];

    this.setState({
      todoList: updateTodoList,
    });
  };

  deleteTodo = (item) => {
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
    });
  };

  filterTodo = () => {
    const { todoList, filterType } = this.state;
    return todoList.filter((todo) => {
      switch (filterType) {
        case 'pending':
          return !todo.isDone;
        case 'completed':
          return todo.isDone;
        default:
          return true;
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={this.addTodo}>
          <input type="text" ref={this.txtInput} required />
          <button type="submit">Add Todo</button>
        </form>
        <TodoList
          todoList={this.filterTodo()}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter
          onFilter={(filterType) => {
            this.setState({
              filterType,
            });
          }}
        />
      </div>
    );
  }
}

export default TodoApp;

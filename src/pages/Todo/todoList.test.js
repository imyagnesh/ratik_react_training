import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import TodoList from './todoList';

const todoList = [
  {
    todoText: 'give training',
    isDone: true,
    id: 3,
  },
  {
    todoText: 'learn vue',
    isDone: false,
    id: 5,
  },
  {
    todoText: 'learn react',
    isDone: false,
    id: 6,
  },
];

const fnCompleteTodo = jest.fn();
const fnDeleteTodo = jest.fn();

const setup = ({ ...data }) => {
  const props = {
    todoList: [],
    completeTodo: fnCompleteTodo,
    deleteTodo: fnDeleteTodo,
    ...data,
  };

  return render(<TodoList {...props} />);
};

describe('TodoList component test', () => {
  test('should take snapshot', () => {
    const { container } = setup({});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should take snapshot with data', () => {
    const { container } = setup({ todoList });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render TodoList component', () => {
    const { container } = setup({});
    expect(container.childElementCount).toBe(1);
  });

  test('should render all todoList items', () => {
    const { queryAllByTestId } = setup({ todoList });
    const todoItems = queryAllByTestId('todoList-item');
    expect(todoItems.length).toBe(todoList.length);
    for (let i = 0; i < todoList.length; i += 1) {
      expect(todoItems[i].childElementCount).toBe(3);

      expect(todoItems[i].childNodes[0]).toHaveAttribute(
        'type',
        'checkbox',
      );

      if (todoList[i].isDone) {
        expect(todoItems[i].childNodes[0]).toHaveAttribute(
          'checked',
          '',
        );
      } else {
        expect(
          todoItems[i].childNodes[0],
        ).not.toHaveAttribute('checked');
      }
      fireEvent.click(todoItems[i].firstChild);
      expect(fnCompleteTodo).toBeCalledTimes(i + 1);
      expect(fnCompleteTodo).toBeCalledWith(todoList[i]);

      expect(todoItems[i].childNodes[1]).toHaveTextContent(
        todoList[i].todoText,
      );
      expect(todoItems[i].childNodes[1]).toHaveStyle(
        `text-decoration: ${
          todoList[i].isDone ? 'line-through' : 'none'
        }`,
      );
      expect(todoItems[i].childNodes[2]).toHaveAttribute(
        'type',
        'button',
      );
      fireEvent.click(todoItems[i].lastChild);
      expect(fnDeleteTodo).toBeCalledTimes(i + 1);
      expect(fnDeleteTodo).toBeCalledWith(todoList[i]);
    }
  });

  test('should not rerender', () => {
    const { rerender } = setup({});
    rerender(
      <TodoList
        todoList={todoList}
        completeTodo={fnCompleteTodo}
        deleteTodo={fnDeleteTodo}
      />,
    );
    const todoItems =
      screen.queryAllByTestId('todoList-item');
    expect(todoItems.length).toBe(todoList.length);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from './utils/axios';
import App from './App';

const mock = new MockAdapter(axios);

beforeEach(() => {});

describe('TodoApp testing', () => {
  it('should match snapshot', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display loader', async () => {
    const { queryByText, findByTestId } = render(<App />);
    expect(queryByText('Loading...')).toBeInTheDocument();
    const hdrError = await findByTestId('error-header');
    expect(hdrError).toBeInTheDocument();
  });

  it('should display content', async () => {
    mock.onGet('/todoList').reply(200, [
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
    ]);
    const { queryByText, findByText } = render(<App />);
    expect(queryByText('Loading...')).toBeInTheDocument();
    const header = await findByText('Todo App');
    expect(header).toBeInTheDocument();
  });
});

import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import TodoFilter from './todoFilter';

const fnFilter = jest.fn();

const setup = () =>
  render(<TodoFilter onFilter={fnFilter} />);

describe('Todo Filter Component', () => {
  it('should match snapshot', () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render component', () => {
    const { queryAllByRole } = setup();
    const buttons = queryAllByRole('button');
    expect(buttons.length).toBe(3);
    expect(buttons[0]).toHaveTextContent('All');
    expect(buttons[1]).toHaveTextContent('Pending');
    expect(buttons[2]).toHaveTextContent('Completed');
  });

  it('should click all button', () => {
    const { queryByText } = setup();
    const btnAll = queryByText('All');
    fireEvent.click(btnAll);
    expect(fnFilter).toBeCalledTimes(1);
    expect(fnFilter).toBeCalledWith('all');
  });

  it('should click pending button', () => {
    const { queryByText } = setup();
    const btnPending = queryByText('Pending');
    fireEvent.click(btnPending);
    expect(fnFilter).toBeCalledTimes(1);
    expect(fnFilter).toBeCalledWith('pending');
  });

  it('should click completed button', () => {
    const { queryByText } = setup();
    const btnCompleted = queryByText('Completed');
    fireEvent.click(btnCompleted);
    expect(fnFilter).toBeCalledTimes(1);
    expect(fnFilter).toBeCalledWith('completed');
  });

  it('should not rerender page', () => {
    const { rerender } = setup();
    rerender(<TodoFilter onFilter={fnFilter} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(3);
  });
});

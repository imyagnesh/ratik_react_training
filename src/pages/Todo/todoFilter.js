import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({ onFilter }) => {
  console.log('render TodoFilter');
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          onFilter('all');
        }}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => {
          onFilter('pending');
        }}
      >
        Pending
      </button>
      <button
        type="button"
        onClick={() => {
          onFilter('completed');
        }}
      >
        Completed
      </button>
    </div>
  );
};

TodoFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default React.memo(TodoFilter, () => {
  console.log('hello');
  return true;
});

import React from 'react';

const NoMatch = (props) => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <button
        type="button"
        onClick={() => {
          props.history.push('/');
        }}
      >
        Go To Home Page
      </button>
    </div>
  );
};

export default NoMatch;

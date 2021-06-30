import React from 'react';

const Contact = (props) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          props.history.replace('/about');
        }}
      >
        Redirect To About Page
      </button>
    </div>
  );
};

export default Contact;

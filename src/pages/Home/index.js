import React from 'react';

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Home Page</h1>
      <button
        type="button"
        onClick={() => {
          props.history.push('/contact');
        }}
      >
        Go to contact page
      </button>
    </div>
  );
};

export default Home;

import React from 'react';

const Login = () => (
  <div>
    <h1>Login</h1>
    <form>
      <div>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="username"
          />
        </label>
        <div style={{ color: 'red' }}>
          username is required
        </div>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
          />
        </label>
        <div style={{ color: 'red' }}>
          username is required
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default Login;

import React from 'react';
import Form from '../../components/Form';
import { fields, initialValues } from './fields';

const wait = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

const Login = () => (
  <div>
    <h1>Login</h1>
    <Form
      fields={fields}
      initialValues={initialValues}
      onSubmit={async (values) => {
        console.log(values);
        await wait(5000);
      }}
      btnProps={{
        children: 'Login',
      }}
    />
  </div>
);

export default Login;

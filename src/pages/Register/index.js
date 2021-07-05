import React from 'react';
import Form from '../../components/Form';
import { fields, initialValues } from './fields';

const wait = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

const Register = () => (
  <div>
    <h1>Register</h1>
    <Form
      fields={fields}
      initialValues={initialValues}
      onSubmit={async (values) => {
        console.log(values);
        await wait(5000);
      }}
      btnProps={{
        children: 'Register',
      }}
    />
  </div>
);

export default Register;

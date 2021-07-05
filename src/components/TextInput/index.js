import React from 'react';

const TextInput = ({
  field, //{ name, value, onChange, onBlur }
  form: { touched, errors },
  label,
  ...props
}) => (
  <div>
    <label htmlFor={field.name}>
      {label}
      <input
        type="text"
        id={field.name}
        {...field}
        {...props}
      />
    </label>
    {touched[field.name] && errors[field.name] && (
      <div style={{ color: 'red' }}>
        {errors[field.name]}
      </div>
    )}
  </div>
);

export default TextInput;

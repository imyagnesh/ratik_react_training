import React from 'react';

const Checkbox = ({
  field, //{ name, value, onChange, onBlur }
  form: { touched, errors },
  label,
  ...props
}) => (
  <div>
    <label htmlFor={field.name}>
      {label}
      <input
        type="checkbox"
        id={field.name}
        {...field}
        {...props}
      />
    </label>
  </div>
);

export default Checkbox;

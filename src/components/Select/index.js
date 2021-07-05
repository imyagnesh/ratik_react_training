import React from 'react';

const Select = ({
  field, //{ name, value, onChange, onBlur }
  form: { touched, errors },
  label,
  placeholder,
  options,
  ...props
}) => (
  <div>
    <label htmlFor={field.name}>
      {label}
      <select {...field} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
    {touched[field.name] && errors[field.name] && (
      <div style={{ color: 'red' }}>
        {errors[field.name]}
      </div>
    )}
  </div>
);

export default Select;

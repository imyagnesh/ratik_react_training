import React from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';

const Form = ({ fields, btnProps, ...props }) => (
  <Formik {...props}>
    {({ isSubmitting }) => (
      <FormikForm>
        {fields.map((field) => (
          <Field key={field.name} {...field} />
        ))}

        <button
          disabled={isSubmitting}
          type="submit"
          {...btnProps}
        />
      </FormikForm>
    )}
  </Formik>
);

export default Form;

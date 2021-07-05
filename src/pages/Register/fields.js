import Select from '../../components/Select';
import TextInput from '../../components/TextInput';

export const fields = [
  {
    name: 'name',
    component: TextInput,
    placeholder: 'Please Enter Name',
    label: 'Name',
    validate: (value) => {
      if (!value) {
        return 'Username required';
      }
      return '';
    },
  },
  {
    name: 'gender',
    component: Select,
    placeholder: 'Please Select Gender',
    label: 'Gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
    ],
    validate: (value) => {
      if (!value) {
        return 'Username required';
      }
      return '';
    },
  },
  {
    name: 'Username',
    component: TextInput,
    placeholder: 'Please Enter Username',
    label: 'Username',
    validate: (value) => {
      if (!value) {
        return 'Username required';
      }
      return '';
    },
  },
  {
    name: 'password',
    component: TextInput,
    placeholder: 'Please Enter Password',
    label: 'Password',
    type: 'password',
    validate: (value) => {
      if (!value) {
        return 'Password required';
      }
      return '';
    },
  },
  {
    name: 'confirmPassword',
    component: TextInput,
    placeholder: 'Please Enter Confirm Password',
    label: 'Confirm Password',
    type: 'password',
    validate: (value) => {
      if (!value) {
        return 'Confirm Password required';
      }
      return '';
    },
  },
];

export const initialValues = fields.reduce(
  (p, c) => ({ ...p, [c.name]: '' }),
  {},
);

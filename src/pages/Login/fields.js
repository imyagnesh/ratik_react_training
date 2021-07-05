import TextInput from '../../components/TextInput';
import Checkbox from '../../components/Checkbox';

export const fields = [
  {
    name: 'username',
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
    name: 'remeberMe',
    component: Checkbox,
    label: 'Remeber Me',
  },
];

export const initialValues = fields.reduce(
  (p, c) => ({ ...p, [c.name]: '' }),
  {},
);

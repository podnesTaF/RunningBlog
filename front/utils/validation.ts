/** @format */

import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Wrong email')
    .required('Please, provide the email'),
  password: yup
    .string()
    .min(6, 'Password at least 6 characters')
    .required('password is required'),
});

export const RegisterShema = yup
  .object()
  .shape({
    fullName: yup.string().required('Please provide name'),
  })
  .concat(LoginFormSchema);

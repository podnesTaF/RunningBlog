/** @format */

import { Alert, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { RegisterShema } from '../../../utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../AuthDialog.module.scss';
import { FormField } from '../../FormField';
import { UserApi } from '../../../utils/api/user';
import { setCookie } from 'nookies';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';

interface LoginFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

const Register: React.FC<LoginFormProps> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterShema),
  });

  const onSubmit = async (dto: any) => {
    try {
      const data = await UserApi.register(dto);
      console.log(data);
      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (err: any) {
      console.warn('Error by registration', err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <FormProvider {...form}>
        <FormField type="text" name="fullName" label="Name and surname" />
        <FormField type="email" name="email" label="Email" />
        <FormField name="password" label="Password" type="password" />
        {errorMessage && (
          <Alert severity="error" className="mb-20">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Register
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Authorize
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;

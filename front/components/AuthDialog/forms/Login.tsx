/** @format */


import React, { useState } from 'react';
import { setCookie } from 'nookies';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../AuthDialog.module.scss';
import { FormField } from '../../FormField';
import { LoginUserDto } from '../../../utils/api/types';
import { Api } from '../../../utils/api';
import { LoginFormSchema } from '../../../utils/validation';

import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';

import { useAppDispatch } from '../../../redux/hooks';
import {setMyFollows, setUserData} from '../../../redux/slices/user';


interface LoginFormProps {
  onOpenRegister: () => void;
}

const Login: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: any) => {
    try {
      const data = await Api().user.login(dto);
      setCookie(null, 'token', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });


      const follows = await Api().user.getFollows();
      const myFollows = follows.filter(follow => follow.followerId.id === data.id)
      const myFollowers = myFollows.map(follow => follow.followingId)

       dispatch(setMyFollows(myFollowers))

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField type="email" name="email" label="Email" />
          <FormField type="password" name="password" label="Password" />
          {errorMessage && (
            <Alert severity="error" className="mb-20">
              {errorMessage}
            </Alert>
          )}
          <div className="d-flex align-center justify-between">
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              color="primary"
              variant="contained"
            >
              Enter
            </Button>
            <Button onClick={onOpenRegister} color="primary" variant="text">
              Registration
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;

/** @format */

import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { UserApi } from './user';
import axios from 'axios';
import { PostApi } from './post';

interface ApiReturnType {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
}

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.token;

  const instance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: { Authorization: 'Bearer ' + token },
  });

  return {
    user: UserApi(instance),
    post: PostApi(instance),
  };
};

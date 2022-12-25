/** @format */

import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { Header } from '../components/Header';
import Head from 'next/head';

import '../styles/globals.scss';
import 'macro-css';
import { wrapper } from '../redux/store';
import {setMyFollows, setUserData} from '../redux/slices/user';
import { Api } from '../utils/api';
import {setPosts} from "../redux/slices/post";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RJournal</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getMe();

            store.dispatch(setUserData(userData));
          const follows = await Api(ctx).user.getFollows();
          const myFollows = follows.filter(follow => follow.followerId.id === userData.id)
          const myFollowers = myFollows.map(follow => follow.followingId)
          store.dispatch(setMyFollows(myFollowers))

          const posts = await Api(ctx).post.getAll()
          store.dispatch(setPosts(posts))
      } catch (err) {
        if (ctx.asPath === '/write') {
          ctx.res?.writeHead(302, {
            location: '/403',
          });
          ctx.res?.end();
        }
        console.log(err);
      }
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      };
    }
);

export default wrapper.withRedux(App);

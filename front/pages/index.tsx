/** @format */

import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post/index';
import { Api } from '../utils/api';
import {PostItem, ResponseUser} from '../utils/api/types';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectFollows, selectUserData} from "../redux/slices/user";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import {selectPosts, setPosts} from "../redux/slices/post";
import SideStatistic from "../components/SideStatistic";

interface HomeProps {
  posts: PostItem[];
}

const Home: NextPage<HomeProps> = () => {
  const  posts  = useAppSelector(selectPosts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      try {
        const posts = await Api().post.getAll()
        dispatch(setPosts(posts))
      } catch (err) {
        console.log(err)
      }

    })()
  }, [])

  return (
    <MainLayout>
      {posts.map((post) => (
        <Post
          type={post.type}
          duration={post.duration}
          distance={post.distance}
          key={post.id}
          id={post.id}
          title={post.title}
          image={post.image}
          text={post.text}
          description={post.description}
          likesCount={+post.likesCount}
          likes={post.likes}
          creator={post.user}
          createdAt={post.createdAt}
        />
      ))}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: any) => {
  try {
    const posts = await Api().post.getAll();
    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      posts: null,
    },
  };
};

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (ctx) => {
//     try {
//       const { authToken } = parseCookies(ctx);

//       const userData = await UserApi.getMe(authToken);

//       store.dispatch(setUserData(userData));

//       return {
//         props: {},
//       };
//     } catch (err) {
//       console.log(err);
//       return {
//         props: {},
//       };
//     }
//   });

export default Home;

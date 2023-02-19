/** @format */

import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post/index';
import { Api } from '../utils/api';
import {PostItem} from '../utils/api/types';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectPosts, setPosts} from "../redux/slices/post";


const Home: NextPage = () => {
  const  posts  = useAppSelector(selectPosts)


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
    const dispatch = useAppDispatch()
    const posts = await Api().post.getAll();
    dispatch(setPosts(posts))
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

export default Home;

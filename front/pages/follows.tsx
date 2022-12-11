/** @format */

import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {Container} from "@mui/system";
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../utils/api";
import {PostItem} from "../utils/api/types";
import Post from "../components/Post";
import {Typography} from "@mui/material";


interface FollowsPageProps {
    posts?: PostItem[]
}
const FollowsPage: NextPage<FollowsPageProps> = ({posts}) => {
  return (
    <MainLayout>
      <Container >
          {posts && posts.length !== 0  ? posts.map((post) => (
              <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  image={post.image}
                  text={post.text}
                  description={post.description}
              />
          )) :
              <Typography>You aren't following people with posts</Typography>
          }
      </Container>
    </MainLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const me = await Api(ctx).user.getMe();
        const myId = me.id
        const follows = await Api(ctx).user.getFollows();
        const myFollows = follows.filter(follow => follow.followerId.id === myId)
        const myFollowings = myFollows.map(follow => follow.followingId)
        const usersIds = myFollowings.map(follow => follow.id)
        const followPosts = await Api(ctx).post.getAll(usersIds)
        return {
            props: {
                posts: followPosts
            }
        }
    } catch(err) {
        console.log('following error', err)
        return {
            props: {
            }
        }
    }
};

export default FollowsPage;

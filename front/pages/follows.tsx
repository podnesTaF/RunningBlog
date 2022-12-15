/** @format */

import React, {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import {Container} from "@mui/system";
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../utils/api";
import {PostItem, ResponseUser} from "../utils/api/types";
import Post from "../components/Post";
import {Typography} from "@mui/material";
import {useAppSelector} from "../redux/hooks";
import {selectFollows, selectUserData} from "../redux/slices/user";
import {selectPosts} from "../redux/slices/post";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

interface FollowsPageProps {
    posts?: PostItem[];
}

const FollowsPage: NextPage<FollowsPageProps> = () => {
    const userData = useAppSelector(selectUserData)

    const posts = useAppSelector(selectPosts)

    const followings = useAppSelector(selectFollows)

    const [ids, setIds] = useState(followings.map(f => f.id))

    const [followsPost, setFollowsPost] = useState<PostItem[]>(posts.filter(p => ids.includes(p.userId)))

    if(!userData) {
        return (
            <MainLayout>
                <Container>
                    <h2>Enter an account to see your follows</h2>
                </Container>
            </MainLayout>
        )
    }

  return (
    <MainLayout>
      <Container >
          {followsPost && followsPost.length !== 0  ? followsPost.map((post) => (
              <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  image={post.image}
                  text={post.text}
                  description={post.description}
                  likesCount={+post.likesCount}
                  likes={post.likes}
                  createdAt={post.createdAt}
                  creator={post.user}
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
                posts: followPosts,
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

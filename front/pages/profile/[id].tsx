/** @format */

import Link from 'next/link';
import { Paper, Avatar, Typography, Button, Tabs, Tab } from '@mui/material';
import {
  SettingsOutlined as SettingsIcon,
  TextsmsOutlined as MessageIcon,
} from '@mui/icons-material';

import Post from '../../components/Post/index';
import MainLayout from '../../layouts/MainLayout';
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../utils/api";
import {CommentItem, PostItem, ResponseUser} from "../../utils/api/types";
import PostComponent from "../../components/PostComments";
import Comment from "../../components/Comment";
import React, {useState} from "react";


interface ProfilePageProps {
  comments?: CommentItem[];
  user: ResponseUser;
  myFollowers: ResponseUser[];
  posts: PostItem[]
}
const ProfilePage: NextPage<ProfilePageProps> = ({comments, user, myFollowers, posts}) => {

  const [active, setActive] = useState(0)

  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
        <div className="d-flex justify-between">
          <div>
            <Avatar
              style={{ width: 120, height: 120, borderRadius: 6 }}
              src={`http://localhost:4000/${user.image}`}
            />
            <Typography
              style={{ fontWeight: 'bold' }}
              className="mt-10"
              variant="h4"
            >
              {user.fullName}
            </Typography>
          </div>
          <div>
            <Link legacyBehavior href="profile/settings">
              <Button
                style={{ height: 42, minWidth: 45, width: 45, marginRight: 10 }}
                variant="contained"
              >
                <SettingsIcon />
              </Button>
            </Link>
            <Button style={{ height: 42 }} variant="contained" color="primary">
              <MessageIcon className="mr-10" />
              Send a message
            </Button>
          </div>
        </div>
        <div className="d-flex mb-10 mt-10">
          <Typography>{user.followerCount} followers</Typography>
        </div>
        <Typography>On project since {user.createdAt.slice(0,10)}</Typography>
        <Tabs
          className="mt-20"
          value={active}
          indicatorColor="primary"
          color="primary"
        >
          <Tab onClick={() => setActive(0)} label="Articles" />
          <Tab onClick={() => setActive(1)} label="Comments" />
          <Tab onClick={() => setActive(2)} label="Marks" />
        </Tabs>
      </Paper>
      <div className="d-flex align-start">
        <div className="mr-20 flex">
          {active === 1 && comments?.map((obj) => (
              <Comment
                  key={obj.id}
                  id={obj.id}
                  user={obj.user}
                  text={obj.text}
                  createdAt={obj.createdAt}
                  currUserId={user.id}
              />
          ))}
          {active === 0 && posts && posts.length !== 0  ? posts.map((post) => (
                  <Post
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      image={post.image}
                      text={post.text}
                      description={post.description}
                  />
              )) :
              <Typography fontSize='x-large'>The user has no posts</Typography>
          }
        </div>
        <Paper style={{ width: 300 }} className="p-20 mb-20" elevation={0}>
          <b>Followers</b>
          <div className="d-flex mt-15">
            {myFollowers?.map(follower => (
                <Avatar
                    key={follower.id}
                    className="mr-10"
                    src={`http://localhost:4000/${follower.image}`}
                />
            ))}
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id || 1;
    const users = await Api(ctx).user.getAll()
    const user = users.find(user => user.id === +id)
    const comments = await Api(ctx).user.getComments(+id)
    const follows = await Api(ctx).user.getFollows();
    const myFollows = follows.filter(follow => follow.followingId.id === +id)
    const myFollowers = myFollows.map(follow => follow.followerId)
    const posts = await Api(ctx).post.getAll()
    const userPosts = posts.filter(post => post.user.id === +id)
    return {
      props: {
        user,
        comments,
        myFollowers,
        posts: userPosts
      },
    }
  } catch (err) {
    console.log('Profile', err)
    return {
      props: {},
    }
  }
}

export default ProfilePage

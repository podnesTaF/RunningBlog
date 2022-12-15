/** @format */

import Link from 'next/link';
import {Paper, Avatar, Typography, Button, Tabs, Tab} from '@mui/material';
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
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addFollow, removeFollow, selectFollows, selectUserData} from "../../redux/slices/user";
import {deletePost, selectPosts} from "../../redux/slices/post";


interface ProfilePageProps {
    comments?: CommentItem[];
    user: ResponseUser;
    myFollowers: ResponseUser[];

    posts: PostItem [];
}

const ProfilePage: NextPage<ProfilePageProps> = ({comments, user, myFollowers  }) => {

    const myFollowings = useAppSelector(selectFollows)

    const userData = useAppSelector(selectUserData)

    const posts = useAppSelector(selectPosts)

    const dispatch = useAppDispatch()

    const isMe = userData?.id === user.id

    const [userPosts, setUserPosts] = useState(posts.filter(p => p.userId === user.id))

    const [active, setActive] = useState(0)

    const [followers, setFollowers] = useState(myFollowers)


    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {

        if (myFollowings.length > 0) {
            myFollowings.forEach(f => {
                if (f.id === user.id) {
                    setIsFollowed(true)
                }
            })
        } else {
            setIsFollowed(false)
        }
    }, [])

    const handleDelete = async(id: number) => {
        try {
            if(isMe) {
                await Api().post.delete(id)
                dispatch(deletePost(id))
                setUserPosts(prev => prev.filter(p => p.id !== id))
            }
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const follow = async () => {
        try {
            const data = await Api().user.follow(user.id)
            dispatch(addFollow(data))
            setFollowers(prev => [...prev, data])
            setIsFollowed(true)
        } catch (err) {
            console.error('follow error', err)
        }
    }

    const unfollow = async () => {
        try {
            await Api().user.unfollow(user.id)
            dispatch(removeFollow(user.id))
            setFollowers(prev => prev.filter(f => f.id !== userData?.id))
            setIsFollowed(false)
        } catch (err) {
            console.log('unfollow error', err)
        }
    }

    return (
        <MainLayout contentFullWidth hideComments>
            <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
                <div className="d-flex justify-between">
                    <div>
                        <Avatar
                            style={{width: 120, height: 120, borderRadius: 6}}
                            src={`http://localhost:4000/${user.image}`}
                        />

                        <Typography
                            style={{fontWeight: 'bold'}}
                            className="mt-10"
                            variant="h4"
                        >
                            {user.fullName}
                        </Typography>
                    </div>
                    <div>
                        {isMe ? (
                            <Link legacyBehavior href="/profile/setting">
                                <Button
                                    style={{height: 42, minWidth: 45, width: 45, marginRight: 10}}
                                    variant="contained"
                                >
                                    <SettingsIcon/>
                                </Button>
                            </Link>
                        ) : isFollowed ? (
                            <Button onClick={unfollow} variant='contained'
                                    style={{height: 42, minWidth: 45, width: 100, marginRight: 10}}>
                                Unfollow
                            </Button>
                        ) : (
                            <Button onClick={follow} variant='outlined'
                                    style={{height: 42, minWidth: 45, width: 100, marginRight: 10}}>
                                Follow
                            </Button>
                        )}
                        <Button style={{height: 42}} variant="contained" color="primary">
                            <MessageIcon className="mr-10"/>
                            Send a message
                        </Button>
                    </div>
                </div>
                <div className="d-flex mb-10 mt-10">
                    <Typography>{followers.length} followers</Typography>
                </div>
                <Typography>On project since {user.createdAt.slice(0, 10)}</Typography>
                <Tabs
                    className="mt-20"
                    value={active}
                    indicatorColor="primary"
                    color="primary"
                >
                    <Tab onClick={() => setActive(0)} label="Articles"/>
                    <Tab onClick={() => setActive(1)} label="Comments"/>
                    <Tab onClick={() => setActive(2)} label="Marks"/>
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
                    {active === 0 && userPosts && userPosts.length !== 0 && userPosts.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                image={post.image}
                                text={post.text}
                                description={post.description}
                                isMe={isMe}
                                likesCount={+post.likesCount}
                                likes={post.likes}
                                handleDelete={handleDelete}
                            />
                        )) }
                    {active === 0 || !posts || posts.length === 0  && <Typography fontSize='x-large'>The user has no posts</Typography>}
                </div>
                <Paper style={{width: 300}} className="p-20 mb-20" elevation={0}>
                    <b>Followers</b>
                    <div className="d-flex mt-15">
                        {followers?.map(follower => (
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
        const user = users.filter(user => user.id === +id)[0]
        const comments = await Api(ctx).user.getComments(+id)
        const follows = await Api(ctx).user.getFollows();
        const myFollows = follows.filter(follow => follow.followingId.id === +id)
        const myFollowers = myFollows.map(follow => follow.followerId)

        const posts = await Api(ctx).post.getAll()
        return {
            props: {
                user,
                comments,
                myFollowers,
                posts
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

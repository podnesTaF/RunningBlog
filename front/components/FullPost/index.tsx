/** @format */

import React, {FC, useEffect, useRef, useState} from 'react';
import {Avatar, Button, Paper, Typography} from '@mui/material';
import MessageIcon from '@mui/icons-material/TextsmsOutlined';
import UserAddIcon from '@mui/icons-material/PersonAddOutlined';

import styles from './FullPost.module.scss';
import {ResponseUser} from "../../utils/api/types";
import Link from "next/link";
import {Api} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addFollow, removeFollow, selectFollows, selectUserData} from "../../redux/slices/user";

interface FullPostProps {
  title: string;
  text: string;
  image?: string;

  user: ResponseUser;
  reference: any;
  isMe?: boolean;
  myFollowers: ResponseUser[]
}

export const FullPost: FC<FullPostProps> = ({title, text, image, user, reference, isMe, myFollowers}) => {

  const myFollowings = useAppSelector(selectFollows)
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch()

  const [followers, setFollowers] = useState(myFollowers)
  const [isFollowed, setIsFollowed] = useState(false)

  useEffect(() => {
    if(myFollowings.length > 0) {
      myFollowings.forEach(f => {
        if(f.id === user.id) {
          setIsFollowed(true)
        }
      })
    }else {
      setIsFollowed(false)
    }
  }, [])

  const follow = async() => {
    try {
      const data = await Api().user.follow(user.id)
      setFollowers(prev => [...prev, data])
      dispatch(addFollow(data))
      setIsFollowed(true)
    } catch (err) {
      console.error('follow error', err)
    }
  }
  const unfollow = async() => {
    try {
      await Api().user.unfollow(user.id)
      dispatch(removeFollow(user.id))
      setFollowers(prev => prev.filter((f) => f.id !== userData?.id))
      setIsFollowed(false)
    } catch (err) {
      console.log('unfollow error', err)
    }
  }


  return (
    <Paper elevation={0} className={styles.paper}>
      <div className="container">
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.text}>
          <Typography>
            {text}
          </Typography>
          {image && (
              <Typography>
                <img src={`http://localhost:4000/${image}`} alt='image' />
              </Typography>
          )}
        </div>
        <hr/>
        <div className="d-flex justify-between align-center mt-30 mb-30">
          <Link href={`/profile/${user.id}`} className={styles.userInfo}>
            {user.image && <img
                src={"http://localhost:4000/" + user.image}
                alt="avatar"
            />}
            {!user.image &&  <Avatar className='mr-10'>{user.fullName[0].toUpperCase()}</Avatar>}
            <b>{user.fullName}</b>
          </Link>
          <div>
            {!isMe && (
            <>
              <Button onClick={() => reference.current.click()} variant="contained" className="mr-15">
                <MessageIcon />
              </Button>
              {!isFollowed ?
                  <Button onClick={follow} variant="contained">
                    <UserAddIcon />
                    <b className="ml-10">Follow</b>
                  </Button>
                  :
                  <Button variant="outlined" onClick={unfollow}>Unfollow</Button>
              }
            </>
                )}
          </div>
        </div>
      </div>
    </Paper>
  );
};


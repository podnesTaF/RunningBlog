/** @format */

import React, {FC, useRef} from 'react';
import {Avatar, Button, Paper, Typography} from '@mui/material';
import PostActions from '../PostActions';
import MessageIcon from '@mui/icons-material/TextsmsOutlined';
import UserAddIcon from '@mui/icons-material/PersonAddOutlined';

import styles from './FullPost.module.scss';
import {ResponseUser} from "../../utils/api/types";

interface FullPostProps {
  title: string;
  text: string;
  image?: string;

  user: ResponseUser;
  reference: any;
}

export const FullPost: FC<FullPostProps> = ({title, text, image, user, reference}) => {


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
          <div className={styles.userInfo}>
            {user.image && <img
                src={"http://localhost:4000/" + user.image}
                alt="avatar"
            />}
            {!user.image &&  <Avatar className='mr-10'>{user.fullName[0].toUpperCase()}</Avatar>}
            <b>{user.fullName}</b>
          </div>
          <div>
            <Button onClick={() => reference.current.click()} variant="contained" className="mr-15">
              <MessageIcon />
            </Button>
            <Button variant="contained">
              <UserAddIcon />
              <b className="ml-10">Follow</b>
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};


/** @format */

import React, {FC} from 'react';
import { Button, Paper, Typography } from '@mui/material';
import PostActions from '../PostActions';
import MessageIcon from '@mui/icons-material/TextsmsOutlined';
import UserAddIcon from '@mui/icons-material/PersonAddOutlined';

import styles from './FullPost.module.scss';
import {OutputData} from "@editorjs/editorjs";

interface FullPostProps {
  title: string;
  text: string;
  image: string;
}

export const FullPost: FC<FullPostProps> = ({title, text, image}) => {
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
          <Typography>
            <img src={image} alt='image' />
          </Typography>
        </div>

        <div style={{ width: 250, marginLeft: -14 }}>
          <PostActions />
        </div>
        <div className="d-flex justify-between align-center mt-30 mb-30">
          <div className={styles.userInfo}>
            <img
              src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png"
              alt="icon"
            />
            <b>Donnie Darko</b>
          </div>
          <div>
            <Button variant="contained" className="mr-15">
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


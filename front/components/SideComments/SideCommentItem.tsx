/** @format */

import Link from 'next/link';
import React from 'react';
import styles from './sideComment.module.scss';
import {PostItem, ResponseUser} from "../../utils/api/types";
import {Avatar} from "@mui/material";

interface CommentItemProps {
  user: ResponseUser;
  text: string;
  post: PostItem;
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <Avatar className='mr-10'>{user.fullName[0].toUpperCase()}</Avatar>
        <Link href={`/profile/${user.id}`}>
          <b>{user.fullName}</b>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${post.id}`}>
        <span className={styles.postTitle}>{post.title}</span>
      </Link>
    </div>
  );
};

export default CommentItem;

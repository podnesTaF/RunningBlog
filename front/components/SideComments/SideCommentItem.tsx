/** @format */

import Link from 'next/link';
import React from 'react';
import styles from './sideComment.module.scss';

interface CommentItemProps {
  user: {
    id: number;
    fullname: string;
  };
  text: string;
  post: {
    title: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
          alt="avatar"
        />
        <Link href={`/profile/${user.id}`}>
          <b>{user.fullname}</b>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${user.id}`}>
        <span className={styles.postTitle}>{post.title}</span>
      </Link>
    </div>
  );
};

export default CommentItem;

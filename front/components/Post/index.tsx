/** @format */

import React from 'react';
import Link from 'next/link';
import { Paper, Typography } from '@mui/material';
import Image from 'next/image';

import styles from './Post.module.scss';
import PostActions from '../PostActions';

interface PostProps {
  title: string;
  id: number;
  text: string;
  image?: string;
}

const Post: React.FC<PostProps> = ({ id, title, text, image }) => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={styles.title}>
        <Link href={`/news/${id}`}>{title}</Link>
      </Typography>
      <Typography className="mt-10 mb-15">{text}</Typography>
      {image && (
        <Image src={image} height={500} width={600} alt={'loo'} />
      )}
      <PostActions />
    </Paper>
  );
};

export default Post;

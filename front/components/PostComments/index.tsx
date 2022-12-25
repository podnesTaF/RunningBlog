/** @format */

import React, { useState} from 'react';
import Comment from '../../components/Comment/index';
import { Paper, Typography, Tabs, Tab, Divider } from '@mui/material';
import AddCommentForm from '../AddCommentForm/index';
import {CommentItem} from "../../utils/api/types";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {useComments} from "../../hooks/useComments";
import clsx from "clsx";

import styles from './PostComments.module.scss';

interface PostCommentsProps {
  postId: number;
  getRef: Function;
  isMain?: boolean;
}
const PostComponent: React.FC<PostCommentsProps> = ({postId, getRef, isMain}) => {
  const userData = useAppSelector(selectUserData)
  const [activeTab, setActiveTab] = useState(0);
  const {comments, setComments} = useComments(postId)

  const onAddComment = (obj: CommentItem) => {
    setComments(prev => [...prev, obj])
  }

  const onRemoveComment = (id: number) => {
    setComments(prev => prev.filter(comment => comment.id !== id))
  }

  return (
    <Paper elevation={0} className={clsx(isMain ? styles.wrapper : "mt-40 p-30")}>
      <div className="container">
        <Typography variant="h6" className="mb-20">
          {comments.length === 0 && 'There is no comments yet.'}
          {comments.length === 1 && `${comments.length} comment`}
          {comments.length > 1 && `${comments.length} comments`}
        </Typography>
        <Tabs
          onChange={(_, newValue) => setActiveTab(newValue)}
          className="mt-20"
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Popular" />
          <Tab label="In order" />
        </Tabs>
        <Divider />
        {userData && <AddCommentForm getRef={getRef} onSuccessAdd={onAddComment} postId={postId} />}
        <div className="mb-20" />
        {comments.map((obj) => (
          <Comment
            key={obj.id}
            id={obj.id}
            user={obj.user}
            text={obj.text}
            createdAt={obj.createdAt}
            currUserId={userData?.id}
            onRemove={onRemoveComment}
          />
        ))}
      </div>
    </Paper>
  );
};

export default PostComponent;

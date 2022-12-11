/** @format */

import React, {useEffect, useState} from 'react';
import Comment from '../../components/Comment/index';
import { Paper, Typography, Tabs, Tab, Divider } from '@mui/material';
import AddCommentForm from '../AddCommentForm/index';
import {Api} from "../../utils/api";
import {CommentItem} from "../../utils/api/types";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {useComments} from "../../hooks/useComments";

interface PostCommentsProps {
  postId: number;
  getRef: Function;
  commentList?: CommentItem[];
}
const PostComponent: React.FC<PostCommentsProps> = ({postId, getRef, commentList}) => {
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
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          42 comments
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
        <div className="mb-20 " />
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

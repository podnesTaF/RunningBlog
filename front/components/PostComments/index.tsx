/** @format */

import React, { useState } from 'react';
import Comment from '../../components/Comment/index';
import { Paper, Typography, Tabs, Tab, Divider } from '@mui/material';
import AddCommentForm from '../AddCommentForm/index';
import data from '../../data';

const PostComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const comments = data.comments[!activeTab ? 'popular' : 'new'];

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
        <AddCommentForm />
        <div className="mb-20 " />
        {comments.map((obj) => (
          <Comment
            key={obj.id}
            user={obj.user}
            text={obj.text}
            createdAt={obj.createdAt}
          />
        ))}
      </div>
    </Paper>
  );
};

export default PostComponent;

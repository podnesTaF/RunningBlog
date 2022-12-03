/** @format */

import React from 'react';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';

import styles from './FollowButton.module.scss';

const FollowButton = () => {
  const [followed, setFollowed] = React.useState(false);

  return (
    <Button
      onClick={() => setFollowed(!followed)}
      variant="contained"
      style={{ minWidth: 30, width: 35, height: 30 }}
    >
      {!followed ? (
        <AddIcon />
      ) : (
        <CheckIcon style={{ fontSize: 20, color: '#2ea83a' }} />
      )}
    </Button>
  );
};

export default FollowButton;

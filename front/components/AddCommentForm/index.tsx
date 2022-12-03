/** @format */

import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

import styles from './AddComentForm.module.scss';

const AddCommentForm = () => {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState('');

  const onAddComment = () => {
    setClicked(false);
    setText('');
  };

  return (
    <div className={styles.form}>
      <Input
        onFocus={(e) => {
          setClicked(true);
        }}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="write a comment"
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {clicked && (
        <Button
          onClick={onAddComment}
          className={styles.addButton}
          variant="contained"
          color="primary"
        >
          Create article
        </Button>
      )}
    </div>
  );
};

export default AddCommentForm;

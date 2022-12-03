/** @format */

import React, { Fragment, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/NavigateNextOutlined';

import styles from './sideComment.module.scss';
import data from '../../data';
import CommentItem from './SideCommentItem';
import clsx from 'clsx';

const SideComments = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={clsx(styles.root, !visible ? styles.rotated : '')}>
      <h3 onClick={toggleVisible}>
        Comments <ArrowRightIcon />
      </h3>
      {visible &&
        data.comments.popular.map((obj) => (
          <CommentItem key={obj.id} {...obj} />
        ))}
    </div>
  );
};

export default SideComments;

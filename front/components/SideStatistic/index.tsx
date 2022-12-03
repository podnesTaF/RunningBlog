/** @format */

import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './SideStatistic.module.scss';
import ArrowRightIcon from '@mui/icons-material/NavigateNextOutlined';
import Link from 'next/link';

const SideStatistic = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={clsx(styles.root, !visible ? styles.rotated : '')}>
      <h3 onClick={toggleVisible}>
        Last runnings <ArrowRightIcon />
      </h3>
      {visible && (
        <div className={styles.statItem}>
          <hr />
          <div className={styles.userInfo}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              alt="avatar"
            />
            <Link href={`/profile/1}`}>
              <b>Oleksii</b>
            </Link>
          </div>
          <div className={styles.content}>
            <h4>distance: 19.99km</h4>
            <small>pace: 4.40</small>
            <small>time: 1.33:45</small>
            <p>Great fillings!</p>
          </div>
          <Link href={`/news/1`}>
            <span className={styles.postTitle}>Morning run</span>
          </Link>
          <hr />
        </div>
      )}
    </div>
  );
};

export default SideStatistic;

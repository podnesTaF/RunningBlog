/** @format */

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';
import {
  WhatshotOutlined as FireIcon,
  SmsOutlined as MessageIcon,
  TrendingUpOutlined as TrendingIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@mui/icons-material';

import styles from './leftMenu.module.scss';

const menu = [
  { text: 'Timeline', icon: <FireIcon />, path: '/' },
  { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
  { text: 'Rating BMb', icon: <TrendingIcon />, path: '/rating' },
  { text: 'Follows', icon: <ListIcon />, path: '/follows' },
];

const LeftMenu: React.FC = () => {
  const router = useRouter();



  return (
    <div className={styles.menu}>
      <ul>
        {menu.map((obj) => (
          <li key={obj.path}>
            <Link href={obj.path}>
              <Button
                className={obj.path === router.asPath ? styles.active : ''}
              >
                {obj.icon}
                {obj.text}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;

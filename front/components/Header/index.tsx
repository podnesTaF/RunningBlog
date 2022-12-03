/** @format */

import React, { useEffect } from 'react';
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from '@mui/icons-material';

import styles from './Header.module.scss';
import Link from 'next/link';
import AuthDialog from '../AuthDialog';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

export const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData);

  const [authVisible, setAuthVisible] = React.useState(false);
  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false);
    }
  }, [authVisible, userData]);

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <Link href="/" className={styles.logo}>
          BattleMile blog
        </Link>
      </div>
      <div className="d-flex">
        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <Link href="/write">
          <Button variant="contained" className={styles.penButton}>
            New Article
          </Button>
        </Link>
      </div>

      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon className={styles.icon} />
        </IconButton>
        <IconButton>
          <NotificationIcon className={styles.icon} />
        </IconButton>
        {userData ? (
          <Link href="/profile/1" className="d-flex align-center">
            <Avatar
              className={styles.avatar}
              alt="Remy Sharp"
              src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
            />
            <ArrowBottom />
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Enter
          </div>
        )}
      </div>
      <AuthDialog onClose={closeAuthDialog} open={authVisible} />
    </Paper>
  );
};

/** @format */

import React, {useEffect, useState} from 'react';
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
    Typography, ListItem, ListItemButton, List,
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
import {useAppSelector} from '../../redux/hooks';
import {selectUserData} from '../../redux/slices/user';
import {PostItem} from "../../utils/api/types";
import {Api} from "../../utils/api";

export const Header: React.FC = () => {
    const userData = useAppSelector(selectUserData);

    const [authVisible, setAuthVisible] = React.useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [posts, setPosts] = useState<PostItem[]>([]);
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

    const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        try {
            if (e.target.value.length === 0) {
                setPosts([])
            } else {
                const {items} = await Api().post.search({title: e.target.value})
                setPosts(items);
            }
        } catch (err: any) {
            console.warn(err.message);
        }
    }

    const handleClosePopup = () => {
        setPosts([])
        setSearchValue('')
    }

    return (
        <Paper classes={{root: styles.root}} elevation={0}>
            <div className="d-flex align-center">
                <Link href="/" className={styles.logo}>
                    BattleMile blog
                </Link>
            </div>
            <div className="d-flex">
                <div className={styles.searchBlock}>
                    <SearchIcon/>
                    <input value={searchValue} onChange={handleChangeInput} placeholder="Search"/>
                    {posts.length > 0 &&
                        <Paper className={styles.searchBlockPopup}>
                            <List>
                                {
                                    posts.map((post) => (
                                        <Link onClick={handleClosePopup} href={`/news/${post.id}`}>
                                            <ListItem key={post.id}>
                                                <ListItemButton>
                                                    {post.title}
                                                </ListItemButton>
                                            </ListItem>
                                        </Link>
                                    ))
                                }

                            </List>
                        </Paper>}
                </div>
                <Link href="/write">
                    <Button variant="contained" className={styles.penButton}>
                        New Article
                    </Button>
                </Link>
            </div>

            <div className="d-flex align-center">
                <IconButton>
                    <MessageIcon className={styles.icon}/>
                </IconButton>
                <IconButton>
                    <NotificationIcon className={styles.icon}/>
                </IconButton>
                {userData ? (
                    <Link href="/profile/1" className="d-flex align-center">
                        {userData.image ? (
                                <Avatar
                                    className={styles.avatar}
                                    alt="Remy Sharp"
                                    src={`http://localhost:4000/${userData.image}`}
                                />)
                            : (
                                <Avatar className='mr-10'>{userData.fullName[0].toUpperCase()}</Avatar>
                            )}
                        <ArrowBottom/>
                    </Link>
                ) : (
                    <div className={styles.loginButton} onClick={openAuthDialog}>
                        <UserIcon/>
                        Enter
                    </div>
                )}
            </div>
            <AuthDialog onClose={closeAuthDialog} open={authVisible}/>
        </Paper>
    );
};

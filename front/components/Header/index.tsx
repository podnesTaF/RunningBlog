/** @format */

import React, {useEffect, useState} from 'react';
import {
    Paper,
    Button,
    IconButton,
    Avatar, ListItem, ListItemButton, List,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {deleteUserData, selectUserData, setUserData} from '../../redux/slices/user';
import {PostItem} from "../../utils/api/types";
import {Api} from "../../utils/api";
import {useRouter} from "next/router";
import {destroyCookie} from "nookies";

export const Header: React.FC = () => {
    const userData = useAppSelector(selectUserData);
    const router = useRouter()
    const dispatch = useAppDispatch();

    const [authVisible, setAuthVisible] = React.useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const logout = async () => {
        handleClose()
        destroyCookie(null, 'token')
        dispatch(deleteUserData());

    }

    return (
        <Paper classes={{root: styles.root}} elevation={0} style={!open ? {overflow: 'hidden', paddingRight: 17} : {}}>
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
                {userData &&
                    <Link href="/write">
                        <Button variant="contained" className={styles.penButton}>
                            New Article
                        </Button>
                    </Link>
                }
            </div>

            <div className="d-flex align-center">
                <IconButton>
                    <MessageIcon className={styles.icon}/>
                </IconButton>
                <IconButton>
                    <NotificationIcon className={styles.icon}/>
                </IconButton>
                {userData ? (
                    <>
                        <Link href={`/profile/${userData.id}`} className="d-flex align-center">
                            {userData.image ? (
                                    <Avatar
                                        className={styles.avatar}
                                        alt="Remy Sharp"
                                        src={`http://localhost:4000/${userData.image}`}
                                    />)
                                : (
                                    <Avatar className='mr-10'>{userData.fullName[0].toUpperCase()}</Avatar>
                                )}
                        </Link>
                        <div>
                            <Button
                                className={styles.arrow}
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <ArrowBottom color='warning'/>
                            </Button>
                            <Menu
                                className={styles.menu}
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => {
                                    handleClose()
                                    return router.push(`/profile/${userData.id}`)
                                }}>Profile</MenuItem>
                                <MenuItem onClick={() => {
                                    handleClose()
                                    return router.push(`/profile/setting`)
                                }}>Setting</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </>
                ) : (
                    <div className={styles.loginButton} onClick={openAuthDialog}>
                        <UserIcon/>
                        Enter
                    </div>
                )}
            </div>
            <AuthDialog onClose={closeAuthDialog} open={authVisible}/>
        </Paper>
    )
};

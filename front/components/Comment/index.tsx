/** @format */

import React from 'react';
import {Avatar, IconButton, Menu, MenuItem, Typography} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreHorizOutlined';

import styles from './Comment.module.scss';
import {ResponseUser} from "../../utils/api/types";
import {Api} from "../../utils/api";

interface CommentPostProps {
    id: number;
    user: ResponseUser;

    currUserId: number | undefined;
    text: string;
    createdAt: string;
    onRemove?: (id: number) => void;

}

const Comment: React.FC<CommentPostProps> = ({id, user, text, createdAt, currUserId, onRemove}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onDelete = async () => {
        if(window.confirm('Are you sure?')){
            try {
                await Api().comment.remove(id)
                if (onRemove) {
                    onRemove(id)
                }
            } catch (err) {
                console.warn('Error deleting comment', err)
                alert('cannot delete comment')
            } finally {
                handleClose()
            }
        }
    }



    return (
        <div className={styles.comment}>
            <div className={styles.userInfo}>
                <Avatar className='mr-10'>{user.fullName[0].toUpperCase()}</Avatar>
                <b>{user.fullName}</b>
                <span>{createdAt}</span>
            </div>
            <Typography className={styles.text}>{text}</Typography>

            {user.id === currUserId && onRemove &&
                <>
                    <IconButton onClick={handleClick}>
                        <MoreIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        elevation={2}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        keepMounted
                    >
                        <MenuItem onClick={onDelete}>Delete</MenuItem>
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                    </Menu>
                </>
            }
        </div>
    );
};

export default Comment;

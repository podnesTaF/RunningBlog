/** @format */

import React from 'react';
import Link from 'next/link';
import {Avatar, Divider, IconButton, Menu, MenuItem, Paper, Typography} from '@mui/material';
import Image from 'next/image';

import styles from './Post.module.scss';
import PostActions from '../PostActions';
import MoreIcon from "@mui/icons-material/MoreHorizOutlined";
import {useRouter} from "next/router";
import {Api} from "../../utils/api";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import {ResponseUser} from "../../utils/api/types";
import {countPace, getHr, getMin, getSec, humanReadable} from "../../utils/time";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {deletePost} from "../../redux/slices/post";
import RunInfo from "../RunInfo";

interface PostProps {
  title: string;
  type: 'running' | 'cycle';
  duration: string;
  distance: string;
  id: number;
  text: string;
  image?: string;
  description: string;
  isMe?: boolean;
  // setPosts?: Function;
  likesCount: number;
  likes: {
      id: number;
  }[];

    creator?: ResponseUser;

    createdAt?: string;

    handleDelete?: Function;
}

const Post: React.FC<PostProps> = ({ id, title, text, image, isMe, likesCount, likes, creator, createdAt, handleDelete, duration, distance, type}) => {

    const userData = useAppSelector(selectUserData);
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [likeIds, setLikeIds] = React.useState(likes?.map((like) => like.id));

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        return router.push('/write/' + id)
    }

    const onLike = async () => {
        try {
            await Api().post.likePost(id)
        } catch (err: any) {
            console.log('like error:', err)
        }
    }

    const onUnlike = async () => {
        try {
            await Api().post.unlikePost(id)
        } catch (err: any) {
            console.log('like error:', err)
        }
    }

  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
        {creator && <div className={styles.userSection}>
            {creator?.image ?
               <Link href={`/profile/${creator.id}`}>
                   <img src={`http://localhost:4000/${creator.image}`} alt='user avatar' />
               </Link>
                :
                <Avatar>{creator.fullName[0]}</Avatar>
            }
            <div className={styles.data}>
                <h3>{creator.fullName}</h3>
                {createdAt &&  <p>{humanReadable(createdAt)}</p>}
            </div>
        </div>}
        <div className={styles.header}>
            <Typography variant="h5" className={styles.titleWrapper}>
                {type === 'running' ? <DirectionsRunIcon fontSize='large' /> : <DirectionsBikeIcon fontSize='large' />}
                <Link href={`/news/${id}`} className={styles.title}>{title}</Link>

            </Typography>
            {isMe && handleDelete &&
                <>
                    <IconButton onClick={handleClick}>
                        <MoreIcon fontSize='large'/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        elevation={2}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        keepMounted
                    >
                        <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
                        <MenuItem onClick={handleUpdate}>Edit</MenuItem>
                    </Menu>
                </>
            }
        </div>

        <Divider />
            <RunInfo duration={duration} distance={distance} />
        <Divider />
      <Typography className="mt-10 mb-15">{text}</Typography>
      {image && (
        <Image style={{marginLeft: 'auto', width: '100%', objectFit:'cover'}}
               width={500}
               height={500}
               src={`http://localhost:4000/${image}`} alt={'loo'} />
      )}
        {userData && <PostActions onLike={onLike} onUnlike={onUnlike} ids={likeIds} likesCount={likesCount}  />}
    </Paper>
  );
};

export default Post;

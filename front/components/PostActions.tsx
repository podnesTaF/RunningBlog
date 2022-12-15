/** @format */

import React, {CSSProperties, useEffect, useState} from 'react';
import { IconButton } from '@mui/material';
import {
  ModeCommentOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
} from '@mui/icons-material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useAppSelector} from "../redux/hooks";
import {selectUserData} from "../redux/slices/user";
import {pink} from "@mui/material/colors";

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  top: '5',
  listStyle: 'none',
  padding: '0',
  margin: '0',
};


interface PostActionsProps {
    onLike: Function;
    onUnlike: Function;
    ids?: number[]

    likesCount: number
}
const PostActions: React.FC<PostActionsProps> = ({onLike, ids, onUnlike, likesCount}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likesCount)
    const userData = useAppSelector(selectUserData)
    const [me, setMe] = useState(userData)
    const myLikes = me?.likes?.find(like => ids?.includes(like.id))

    useEffect(() => {
        if(myLikes?.id) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [])

    const handleLike = () => {
        if(isLiked) {
            onUnlike()
            setIsLiked(false)
            setLikeCount(prev => prev - 1)
        } else {
            setIsLiked(true)
            onLike()
            setLikeCount(prev => prev + 1)
        }
    }

  return (
    <ul style={styles}>
      <li>
          <IconButton onClick={handleLike}>
              {!isLiked ? (
                  <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon sx={{ color: pink[500] }} />
              )}
          </IconButton>
          {likeCount} likes
      </li>
      <li>
          <IconButton>
              <CommentsIcon />
          </IconButton>
      </li>
      <li>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </li>
    </ul>
  );
};

export default PostActions;

/** @format */

import { OutputData } from '@editorjs/editorjs';
import Post from "../../components/Post";

export type LoginUserDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  fullName: string;
  image?: string;
} & LoginUserDto;

export type Follow = {
  id: number;
  followingId: ResponseUser;
  followerId: ResponseUser;
}

export type ResponseUser = {
  createdAt: string;
  email: string;
  fullName: string;

  image?: string
  id: number;
  commentsCount?: number;
  followers?: {
    id: number
  }[];
  followings?: {
    id: number
  }[];

  followingsCount: number;
  followerCount: number;
  token: string;
  updatedAt: string;
};

export type PostItem = {
  title: string;
  text: string;
  image?: string;
  description: string;
  tags: null | string;
  id: number;
  views: number;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};


export type CommentItem = {
  id: number
  text: string;
  post: PostItem;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
}

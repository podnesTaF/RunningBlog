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

export type UpdateUserDto = {
  fullName?: string;
  image?: string;
  oldPassword?: string;

  password?: string;
}

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

  likes?: {
    id: number;
  }[]

  followingsCount: number;
  followerCount: number;

  likesCount?: number;
  postsCount?: number;

  runningDistance: number;

  cycleDistance: number;
  token: string;
  updatedAt: string;

  lastActivity?: PostItem;
};

export type PostItem = {
  type: 'running' | 'cycle';
  duration: string;
  distance: string;
  title: string;
  text: string;
  image?: string;
  description: string;
  tags: null | string;
  id: number;
  views: number;

  userId: number;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
  likesCount: string;

  likes: {
    id: number
  }[]

};


export type CommentItem = {
  id: number
  text: string;
  post: PostItem;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
}

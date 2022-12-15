/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostItem } from '../../utils/api/types';
import { RootState } from '../store';

import { HYDRATE } from 'next-redux-wrapper';

export interface PostState {
    posts: PostItem[];
}

const initialState: PostState = {
    posts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostItem[]>) => {
            state.posts = action.payload;
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(p => p.id !== action.payload);
        },
        updatePost: (state, action: PayloadAction<PostItem>) => {
            // let postToUpdate = state.posts.find(p => p.id === action.payload.id)
            state.posts = state.posts.map(p => {
                if(p.id === action.payload.id) {
                    return action.payload;
                }
                return p;
                }
            )
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.post,
            };
        },
    },
});

export const { setPosts } = postSlice.actions;
export const {deletePost} = postSlice.actions
export const {updatePost} = postSlice.actions



export const selectPosts = (state: RootState) => state.post.posts;


export const postReducer = postSlice.reducer;
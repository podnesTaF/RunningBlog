/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostItem } from '../../utils/api/types';
import { RootState } from '../store';

import { HYDRATE } from 'next-redux-wrapper';

export interface PostState {
    data?: PostItem | null;
}

const initialState: PostState = {
    data: null,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<PostItem>) => {
            state.data = action.payload;
        },
        deletePost: (state) => {
            state.data = null
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

export const { setPost } = postSlice.actions;
export const {deletePost} = postSlice.actions

// export const selectPost = (state: RootState) => state.post.data;


export const postReducer = postSlice.reducer;
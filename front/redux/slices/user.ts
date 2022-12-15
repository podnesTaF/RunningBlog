/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseUser } from '../../utils/api/types';
import { RootState } from '../store';

import { HYDRATE } from 'next-redux-wrapper';

export interface UserState {
  data?: ResponseUser | null;

  follows: ResponseUser[]
}

const initialState: UserState = {
  data: null,
  follows: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseUser>) => {
      state.data = action.payload;
    },
    deleteUserData: (state) => {
      state.data = null
    },
    setMyFollows: (state, action: PayloadAction<ResponseUser[]>) => {
      state.follows = action.payload
    },
    addFollow: (state, action: PayloadAction<ResponseUser>) => {
      state.follows = [...state.follows, action.payload]
    },
    removeFollow: (state, action: PayloadAction<number>) => {
      state.follows = state.follows.filter(f => f.id === action.payload)
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;
export const {deleteUserData} = userSlice.actions



export const selectUserData = (state: RootState) => state.user.data;



export const userReducer = userSlice.reducer;

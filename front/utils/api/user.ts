/** @format */

import axios, { AxiosInstance } from 'axios';
import {CreateUserDto, Follow, LoginUserDto, ResponseUser} from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ResponseUser[]>(
      'users'
    );
    return data;
  },

  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>(
      'auth/register',
      dto
    );
    return data;
  },

  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: ResponseUser }>(
      'auth/login',
      dto
    );
    return data;
  },

  async getMe() {
    const { data } = await instance.get<ResponseUser>('users/me');
    return data;
  },

  async getOne(id: number){
    const { data } = await instance.get<ResponseUser>('users/' + id)
    return data
  },

  async getComments(id: number) {
    const { data } = await instance.get<ResponseUser>('/comments?userId=' + id);
    return data;
  },

  async getFollows() {
    const {data} = await instance.get<Follow[]>('/follows');
    return data
  }
});

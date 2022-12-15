/** @format */

import {OutputData} from '@editorjs/editorjs';
import {AxiosInstance} from 'axios';
import {PostItem} from './types';

type CreatePostDto = {
    title: string;
    text: string;
    image?: any;
};

type SearchPostDto = {
    title?: string;
    text?: string;
    views?: 'DESC' | 'ASC';
    limit?: number;
    take?: number;
    tag?: string;
}

export const PostApi = (instance: AxiosInstance) => ({
    async getAll(ids?: number[]) {
        let query = '';
        if (ids) {
            query = ids.join(',')
        }
        const {data} = await instance.get<PostItem[]>('/posts?query=' + query);
        return data;
    },

    async search(query: SearchPostDto) {
        const {data} = await instance.get<{items: PostItem[], total: number}>('/posts/search', {params: query});
        return data;
    },

    async likePost(postId: number) {
        await instance.post('/likes', {postId});
    },

    async unlikePost(postId: number) {
        await instance.delete('/likes/' + postId );
    },

    async getOne(id: number) {
        const {data} = await instance.get<PostItem>(`/posts/${id}`);
        return data;
    },

    async create(dto: CreatePostDto) {
        console.log(dto.image)
        let formData = new FormData()
        formData.append('title', dto.title)
        formData.append('text', dto.text)
        formData.append('image', dto.image)
        const {data} = await instance.post<CreatePostDto, { data: PostItem }>(
            '/posts',
            formData
        );
        return data;
    },

    async delete(id: number) {
      const {data} = await instance.delete('/posts/' + id);
      return data
    },

    async update(id: number, dto: CreatePostDto) {
        let formData = new FormData()
        formData.append('title', dto.title)
        formData.append('text', dto.text)
        formData.append('image', dto.image)
        const {data} = await instance.patch<CreatePostDto, { data: PostItem }>(
            `/posts/${id}`,
            formData
        );
        return data;
    },
});

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
    async getAll() {
        const {data} = await instance.get<PostItem[]>('/posts');
        return data;
    },

    async search(query: SearchPostDto) {
        const {data} = await instance.get<{items: PostItem[], total: number}>('/posts/search', {params: query});
        return data;
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

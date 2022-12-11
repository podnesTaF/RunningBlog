/** @format */

import {OutputData} from '@editorjs/editorjs';
import {AxiosInstance} from 'axios';
import {CommentItem, PostItem} from './types';

type CreateCommentDto = {
    postId: number,
    text: string;
};

export const CommentApi = (instance: AxiosInstance) => ({
    async getAll(postId: number | undefined){
        const {data} = await instance.get<CommentItem[]>('/comments', {params: {
            postId
            }});
        return data;
    },

    remove(id: number) {
        return instance.delete(`/comments/${id}`)
    },

    async create(dto: CreateCommentDto) {
        const {data} = await instance.post<CreateCommentDto, {data: CommentItem}>(`/comments`, dto);
        return data;
    }
});

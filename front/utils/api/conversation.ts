import {AxiosInstance} from "axios";
import {MessageDto} from "./types";


export const ConversationApi = (instance: AxiosInstance) => ({
    async getByUser() {
        const {data} = await instance.get('/conversations');
        return data;
    },
    async getMessages(chatId: number) {
        const {data} = await instance.get(`/messages/${chatId}`);
        return data;
    },

    async sendMessage(dto: MessageDto) {
        const {data} = await instance.post('/messages', dto);
        return data;
    }
})
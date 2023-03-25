/** @format */

import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Conversation from "../components/Messenger/Conversation";
import Messenger from "../components/Messenger";
import {useAppDispatch} from "../redux/hooks";
import {Api} from "../utils/api";
import {setPosts} from "../redux/slices/post";
import {NextPage} from "next";
import {ConversationItem} from "../utils/api/types";


interface MessagesPageProps {
    conversations: ConversationItem[];
}

const MessagesPage:NextPage<MessagesPageProps> = ({conversations}) => {
  return (
    <MainLayout hideComments={true} >
      <Messenger conversations={conversations}  />
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: any) => {
    try {
        const conversations = await Api(ctx).conversation.getByUser();
        console.log('conversations', conversations)
        return {
            props: {
                conversations,
            },
        };
    } catch (err) {
        console.log(err);
    }
    return {
        props: {
            posts: null,
        },
    };
};

export default MessagesPage;

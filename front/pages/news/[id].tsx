/** @format */

import MainLayout from '../../layouts/MainLayout';
import {FullPost} from '../../components/FullPost';
import PostComponent from '../../components/PostComments';
import data from '../../data';
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../utils/api";
import { PostItem, ResponseUser } from '../../utils/api/types';
import {useState} from "react";

interface FullPostPageProps {
    post: PostItem;
    user: ResponseUser;

    isMe?: boolean;

    myFollowers: ResponseUser[]
}

const FullPostPage: NextPage<FullPostPageProps> = ({post, user, myFollowers,  isMe}) => {

    const [reference, setRef] = useState()
    const getRef = (ref: any) => {
        setRef(ref)
    }

    return (
        <MainLayout className="mb=50" contentFullWidth hideComments={true}>
            <FullPost reference={reference} title={post.title} isMe={isMe} myFollowers={myFollowers} text={post.text} image={post.image} user={user} />
            <PostComponent getRef={getRef} postId={post.id} />
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx?.params?.id || 1
        const post = await Api(ctx).post.getOne(+id);
        const users = await Api(ctx).user.getAll();
        const user = users.find(user => user.id === post.userId)
        const follows = await Api(ctx).user.getFollows();
        const myFollows = follows.filter(follow => follow.followingId.id === user?.id)
        const myFollowers = myFollows.map(follow => follow.followerId)
        let me
        try {
            me = await Api(ctx).user.getMe()
            const isMe = user?.id === me.id
            return {
                props: {
                    post,
                    user,
                    isMe,
                    myFollowers
                },
            };
        } catch(err) {
            return {
                props: {
                    post,
                    user,
                    myFollowers
                },
            };
        }
    } catch (err) {
        console.log('Full post page: ' + err);
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};

export default FullPostPage;
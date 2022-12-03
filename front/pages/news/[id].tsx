/** @format */

import MainLayout from '../../layouts/MainLayout';
import {FullPost} from '../../components/FullPost';
import PostComponent from '../../components/PostComments';
import data from '../../data';
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../utils/api";
import { PostItem } from '../../utils/api/types';

interface FullPostPageProps {
    post: PostItem;


}

const FullPostPage: NextPage<FullPostPageProps> = ({post}) => {
    return (
        <MainLayout className="mb=50" contentFullWidth>
            <FullPost title={post.title} text={post.text} image={post.image} />
            <PostComponent />
        </MainLayout>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx?.params?.id || 1;
        const post = await Api(ctx).post.getOne(+id);
        const user = await Api(ctx).user.getMe();



        return {
            props: {
                post,
            },
        };
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
/** @format */

import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post/index';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

interface HomeProps {
  posts: PostItem[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          image={post.image}
          text={post.text}
          description={post.description}
        />
      ))}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: any) => {
  try {
    const posts = await Api().post.getAll();
    return {
      props: {
        posts,
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

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (ctx) => {
//     try {
//       const { authToken } = parseCookies(ctx);

//       const userData = await UserApi.getMe(authToken);

//       store.dispatch(setUserData(userData));

//       return {
//         props: {},
//       };
//     } catch (err) {
//       console.log(err);
//       return {
//         props: {},
//       };
//     }
//   });

export default Home;

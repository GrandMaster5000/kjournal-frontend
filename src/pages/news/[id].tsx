import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import React from 'react';
import { PostComments } from '../../components/PostComments';
import { GetServerSideProps, NextPage } from 'next';
import { PostItem } from '../../utils/api/types';
import { Api } from '../../utils/api';

interface PostProps {
	post: PostItem;
}

const Post: NextPage<PostProps> = ({ post }) => {
	return (
		<MainLayout className="mb-50" contentFullWidth>
			<FullPost title={post.title} blocks={post.body} />
			<PostComments postId={post.id} />
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const id = ctx.params.id;
		const post = await Api(ctx).post.getOne(+id);

		return {
			props: {
				post,
			},
		};
	} catch (e) {
		console.log('Full post page', e);
		return { props: {}, redirect: { destination: '/', permanent: false } };
	}
};

export default Post;

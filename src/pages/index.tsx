import { NextPage } from 'next';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

interface HomeProps {
	posts: PostItem[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
	return (
		<MainLayout>
			{posts.map((post) => (
				<Post key={post.id} id={post.id} title={post.title} description={post.decription} />
			))}
		</MainLayout>
	);
};

export default Home;

export const getServerSideProps = async (ctx) => {
	try {
		const posts = await Api(ctx).post.getAll();
		return { props: { posts } };
	} catch (e) {
		return {
			props: {
				posts: null,
			},
		};
	}
};

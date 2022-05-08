import { GetServerSideProps, NextPage } from 'next';
import { MainLayout } from '../../layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm';
import { Api } from '../../utils/api';
import { wrapper } from '../../redux/store';
import { PostItem } from '../../utils/api/types';

interface WritePageProps {
	post: PostItem;
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
	return (
		<MainLayout className="main-layout-white" hideComments hideMenu>
			<WriteForm post={post} />
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		try {
			const id = ctx.params.id;
			const post = await Api(ctx).post.getOne(+id);
			const user = store.getState().user;

			if (post.user.id !== user.data.id) {
				return { props: { post: null }, redirect: { destination: '/', permanent: false } };
			}

			return {
				props: {
					post,
				},
			};
		} catch (e) {
			console.log('Write page', e);
			return { props: {}, redirect: { destination: '/', permanent: false } };
		}
	},
);

export default WritePage;

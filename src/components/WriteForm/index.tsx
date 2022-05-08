import { Button, Input } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

import styles from './WriteFrom.module.scss';

const Editor = dynamic(() => import('../Editor'), { ssr: false });

interface WriteFormProps {
	post?: PostItem;
}

export const WriteForm = ({ post }: WriteFormProps) => {
	const router = useRouter();
	const [isLoading, setIdLodaing] = useState(false);
	const [title, setTitle] = useState(post?.title || '');
	const [blocks, setBlocks] = useState(post?.body || []);

	const onAddPost = async () => {
		setIdLodaing(true);
		try {
			const data = {
				title,
				body: blocks,
			};

			if (!post) {
				const post = await Api().post.create(data);
				router.push(`/write/${post.id}`);
			} else {
				await Api().post.update(post.id, data);
			}
		} catch (e) {
			console.warn('Create post', e);
		} finally {
			setIdLodaing(false);
		}
	};

	return (
		<div>
			<Input
				classes={{ root: styles.titleField }}
				placeholder="Заголовок"
				defaultValue={title}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Editor initialBlocks={post?.body} onChange={setBlocks} />
			<Button
				disabled={isLoading || !blocks.length || !title}
				onClick={onAddPost}
				variant="contained"
				color="primary"
			>
				{post ? 'Сохранить' : 'Опубликовать'}
			</Button>
		</div>
	);
};

import { CommentItem } from '../utils/api/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Api } from '../utils/api';

type UseCommentsProps = {
	setComments: Dispatch<SetStateAction<CommentItem[]>>;
	comments: CommentItem[];
};

export const useComments = (postId?: number): UseCommentsProps => {
	const [comments, setComments] = useState<CommentItem[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const arr = await Api().comment.getAll(postId);
				setComments(arr);
			} catch (err) {
				console.warn('Fetch comments', err);
			}
		})();
	}, []);

	return { comments, setComments };
};

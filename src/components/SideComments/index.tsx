import { useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import { CommentItem } from './CommentItem';

import styles from './SideComments.module.scss';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComments';

export const SideComments = () => {
	const [visibleComments, setVisibleComments] = useState(false);
	const { comments } = useComments();

	const toggleVisibleComments = () => {
		setVisibleComments((prev) => !prev);
	};

	return (
		<div className={clsx(styles.root, !visibleComments && styles.rotated)}>
			<h3 onClick={toggleVisibleComments}>
				Комментарии <ArrowRightIcon />
			</h3>
			{visibleComments && comments.map((obj, i) => <CommentItem key={i} {...obj} />)}
		</div>
	);
};

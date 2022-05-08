import { useEffect, useState } from 'react';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { AddCommentForm } from '../AddCommentForm';
import { Comment } from '../Comment';
import { Api } from '../../utils/api';
import { CommentItem } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user.slice';
import { useComments } from '../../hooks/useComments';

interface PostCommentsProps {
	postId: number;
}

export const PostComments = ({ postId }: PostCommentsProps) => {
	const userData = useAppSelector(selectUserData);
	const [activeTab, setActiveTab] = useState(0);
	const { comments, setComments } = useComments(postId);

	const onAddComment = (comment: CommentItem) => {
		setComments((prev) => [...prev, comment]);
	};

	const onRemoveComment = (id: number) => {
		setComments((prev) => prev.filter((com) => com.id !== id));
	};

	return (
		<Paper elevation={1} className="mt-40 p-30">
			<div className="container">
				<Typography variant="h6" className="mb-20">
					42 комментария
				</Typography>
				<Tabs
					onChange={(_, newValue) => setActiveTab(newValue)}
					className="mt-20"
					value={activeTab}
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Популярные" />
					<Tab label="По порядку" />
				</Tabs>
				<Divider />
				{userData && <AddCommentForm onSuccessAdd={onAddComment} postId={postId} />}
				<div className="mb-20" />
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						currentUserId={userData?.id}
						onRemove={onRemoveComment}
						{...comment}
					/>
				))}
			</div>
		</Paper>
	);
};

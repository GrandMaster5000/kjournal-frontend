import { Button, Input } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { Api } from '../../utils/api';
import { CommentItem } from '../../utils/api/types';
import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {
	postId: number;
	onSuccessAdd: (comment: CommentItem) => void;
}

export const AddCommentForm = ({ postId, onSuccessAdd }: AddCommentFormProps) => {
	const [clicked, setClicked] = useState(false);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [commentText, setCommentText] = useState('');

	const onAddComment = async () => {
		setIsSubmiting(true);
		try {
			const comment = await Api().comment.create({
				postId,
				text: commentText,
			});
			onSuccessAdd(comment);
			setClicked(false);
			setCommentText('');
		} catch (e) {
			console.warn('Add comment', e);
		} finally {
			setIsSubmiting(false);
		}
	};

	const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentText(e.target.value);
	};

	return (
		<div className={styles.form}>
			<Input
				classes={{ root: styles.fieldRoot }}
				placeholder="Написать комментарий..."
				minRows={clicked ? 5 : 1}
				fullWidth
				multiline
				value={commentText}
				onFocus={() => setClicked(true)}
				onChange={onChangeComment}
				disabled={isSubmiting}
			/>
			{clicked && (
				<Button
					className={styles.addButton}
					variant="contained"
					color="primary"
					onClick={onAddComment}
					disabled={isSubmiting}
				>
					Опубликовать
				</Button>
			)}
		</div>
	);
};

import { Button, Input } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'
import styles from './AddCommentForm.module.scss'

export const AddCommentForm = () => {
	const [clicked, setClicked] = useState(false);
	const [commentText, setCommentText] = useState('')

	const onAddComment = () => {
		setCommentText('');
		setClicked(false);
	}

	const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentText(e.target.value)
	}

	return (
		<div className={styles.form}>
			<Input 
				classes={{ root: styles.fieldRoot }}
				placeholder='Написать комментарий...'
				minRows={clicked ? 5 : 1}
				fullWidth
				multiline
				value={commentText}
				onFocus={() => setClicked(true)}
				onChange={onChangeComment}
			/>
			{clicked &&	
				<Button 
					className={styles.addButton} 
					variant="contained" 
					color="primary"
					onClick={onAddComment}
				>
					Опубликовать
				</Button>
			}
		</div>
	)
}
import React from 'react';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { User } from '../../utils/api/types';
import { Api } from '../../utils/api';

interface CommentPostProps {
	id: number;
	user: User;
	text: string;
	createdAt: Date;
	currentUserId: number;
	onRemove: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({
	id,
	user,
	text,
	createdAt,
	currentUserId,
	onRemove,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickRemove = async () => {
		try {
			await Api().comment.remove(id);
			onRemove(id);
		} catch (e) {
			console.warn('Error remove comment', e);
		} finally {
			handleClose();
		}
	};

	return (
		<div className={styles.comment}>
			<div className={styles.userInfo}>
				<Avatar style={{ marginRight: 10 }}>{user.fullName[0]}</Avatar>
				<b>{user.fullName}</b>
				<span>{createdAt}</span>
			</div>
			<Typography className={styles.text}>{text}</Typography>
			{currentUserId && <span className={styles.replyBtn}>Ответить</span>}
			{user?.id === currentUserId && (
				<>
					<IconButton onClick={handleClick}>
						<MoreIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						elevation={2}
						open={Boolean(anchorEl)}
						onClose={handleClose}
						keepMounted
					>
						<MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
						<MenuItem onClick={handleClose}>Редактировать</MenuItem>
					</Menu>
				</>
			)}
		</div>
	);
};

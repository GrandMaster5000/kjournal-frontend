import React from 'react';
import Link from 'next/link';
import { Paper, Button, IconButton, Avatar } from '@material-ui/core';
import {
	SearchOutlined as SearchIcon,
	SmsOutlined as MessageIcon,
	Menu as MenuIcon,
	NotificationsNoneOutlined as NotificationIcon,
	AccountCircleOutlined as UserIcon,
	ExpandMoreOutlined as ArrowBottom,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user.slice';

export const Header: React.FC = () => {
	const userData = useAppSelector(selectUserData);
	const [authVisible, setAuthVisible] = React.useState(false);

	const openAuthDialog = () => {
		setAuthVisible(true);
	};

	const closeAuthDialog = () => {
		setAuthVisible(false);
	};

	return (
		<Paper classes={{ root: styles.root }} elevation={7}>
			<div className="d-flex align-center">
				<IconButton>
					<MenuIcon />
				</IconButton>

				<Link href="/">
					<a>
						<svg className={styles.logo} viewBox="0 0 24 25">
							<path fill="#e8a427" d="M0 19h8.5v6H0v-6z"></path>
							<path d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
							<path fill="rgba(0,0,0,0.15)" d="M7.5 19h1v6l-1-6z"></path>
						</svg>
					</a>
				</Link>

				<div className={styles.searchBlock}>
					<SearchIcon />
					<input placeholder="Поиск" />
				</div>

				<Link href="/write">
					<a>
						<Button variant="contained" className={styles.penButton}>
							Новая запись
						</Button>
					</a>
				</Link>
			</div>
			<div className="d-flex align-center">
				<IconButton>
					<MessageIcon />
				</IconButton>
				<IconButton>
					<NotificationIcon />
				</IconButton>
				{userData ? (
					<Link href="/profile/1">
						<a className="d-flex align-center">
							<Avatar
								className={styles.avatar}
								alt="Remy Sharp"
								src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
							/>
							<ArrowBottom />
						</a>
					</Link>
				) : (
					<div className={styles.loginButton} onClick={openAuthDialog}>
						<UserIcon />
						Войти
					</div>
				)}
			</div>
			<AuthDialog onClose={closeAuthDialog} visible={authVisible} />
		</Paper>
	);
};

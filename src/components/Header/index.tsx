import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper, Button, IconButton, Avatar, List, ListItem } from '@material-ui/core';
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
import { PostItem } from '../../utils/api/types';
import { Api } from '../../utils/api';

export const Header: React.FC = () => {
	const userData = useAppSelector(selectUserData);
	const [authVisible, setAuthVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [posts, setPosts] = useState<PostItem[]>([]);

	const openAuthDialog = () => {
		setAuthVisible(true);
	};

	const closeAuthDialog = () => {
		setAuthVisible(false);
	};

	const hanldeChangeSearchInput = async (value: string) => {
		setSearchValue(value);
		try {
			const { items } = await Api().post.search({ title: value });
			setPosts(items);
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		if (authVisible && userData) {
			setAuthVisible(false);
		}
	}, [authVisible, userData]);

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
					<input
						value={searchValue}
						onChange={(e) => hanldeChangeSearchInput(e.target.value)}
						placeholder="Поиск"
					/>
					{posts.length > 0 && (
						<Paper className={styles.searchBlockPopup}>
							<List>
								{posts.map((post) => (
									<Link key={post.id} href={`/news/${post.id}`}>
										<a>
											<ListItem button>{post.title}</ListItem>
										</a>
									</Link>
								))}
							</List>
						</Paper>
					)}
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

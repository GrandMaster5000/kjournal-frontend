import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import Link from 'next/link';

interface PostProps {
	id: number;
	title: string;
	description: string;
	imageUrl?: string;
}

export const Post = ({ id, title, description, imageUrl }: PostProps) => {
	return (
		<Paper elevation={1} className="p-20" classes={{ root: styles.paper }}>
			<Typography variant="h5" className={styles.title}>
				<Link href={`/news/${id}`}>
					<a>{title}</a>
				</Link>
			</Typography>
			<Typography className="mt-10 mb-15">{description}</Typography>
			{imageUrl && <Image src={imageUrl} height={500} width={600} alt={title} />}
		</Paper>
	);
};

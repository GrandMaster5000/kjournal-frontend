import { Button, Input } from '@material-ui/core';
import dynamic from 'next/dynamic'

import styles from './WriteFrom.module.scss'

const Editor = dynamic(
	() => import('../Editor'), 
	{ ssr: false }
)


interface WriteFormProps {
	title?: string;
}

export const WriteForm = ({ title }: WriteFormProps) => {


	return (
		<div>
			<Input 
				classes={{ root: styles.titleField}}
				placeholder='Заголовок' 
				defaultValue={title} 
			/>
			<Editor/>
			<Button variant="contained" color="primary">
				Опубликовать
			</Button>
		</div>
	)
}
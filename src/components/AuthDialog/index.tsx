import React from 'react';
import { 
	Button, 
	Dialog, 
	DialogContent, 
	DialogContentText, 
	Divider, 
	TextField, 
	Typography 
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './AuthDialog.module.scss';
import { Main } from './froms/Main';
import { Login } from './froms/Login';
import { Register } from './froms/Register';

interface AuthDialogProps {
	onClose: () => void;
	visible: boolean;
}

export type FormType = 'main' | 'login' | 'register'

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
	const [formType, setFormType] = React.useState<FormType>('main');

	return (
		<Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogContent>
				<DialogContentText>
					<div className={styles.content}>
						<Typography className={styles.title}>
							{formType === 'main' ? (
								'Вход в KJ'
							) : (
								<p onClick={() => setFormType('main')} className={styles.backTitle}>
									<ArrowBackIcon /> К авторизации
								</p>
							)}
						</Typography>
						{formType === 'main' && <Main setFormType={setFormType}/>}
						{formType === 'login' && <Login setFormType={setFormType}/>}
						{formType === 'register' && <Register setFormType={setFormType}/>}
					</div>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

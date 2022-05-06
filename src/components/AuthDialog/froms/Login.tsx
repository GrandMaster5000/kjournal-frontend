import { Button } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@material-ui/lab/Alert';

import { FormType } from '..';
import { LoginFormSchema } from '../../../utils/schemas/loginValidation';
import { FormField } from '../../FormField';
import { LoginUserDto } from '../../../utils/api/types';
import { UserApi } from '../../../utils/api';
import { setCookie } from 'nookies';

interface LoginProps {
	setFormType: Dispatch<SetStateAction<FormType>>;
}

export const Login = ({ setFormType }: LoginProps) => {
	const [errorMessage, setErrorMessage] = useState('');
	const form = useForm({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema),
	});

	const onSubmit = async (dto: LoginUserDto) => {
		try {
			const data = await UserApi.login(dto);
			setCookie(null, 'ktoken', data.access_token, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			});
			setErrorMessage('');
		} catch (e) {
			console.warn('Register error', e);
			setErrorMessage(e.response.data.message);
		}
	};

	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField name="email" label="Почта" />
					<FormField name="password" label="Пароль" />
					{errorMessage && (
						<Alert severity="error" className="mb-20">
							{errorMessage}
						</Alert>
					)}
					<div className="d-flex align-center">
						<Button
							type="submit"
							color="primary"
							variant="contained"
							disabled={!form.formState.isValid || form.formState.isSubmitting}
						>
							Войти
						</Button>
						<Button
							color="primary"
							variant="text"
							className="ml-10"
							onClick={() => setFormType('register')}
						>
							Регистрация
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

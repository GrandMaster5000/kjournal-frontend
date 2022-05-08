import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { setCookie } from 'nookies';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';

import { FormType } from '..';
import { UserApi } from '../../../utils/api/user';
import { CreateUserDto } from '../../../utils/api/types';
import { RegisterFormSchema } from '../../../utils/schemas/loginValidation';
import { FormField } from '../../FormField';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user.slice';
import { Api } from '../../../utils/api';

interface RegisterProps {
	setFormType: Dispatch<SetStateAction<FormType>>;
}

export const Register = ({ setFormType }: RegisterProps) => {
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const form = useForm({
		mode: 'onChange',
		resolver: yupResolver(RegisterFormSchema),
	});

	const onSubmit = async (dto: CreateUserDto) => {
		try {
			const data = await Api().user.login(dto);
			setCookie(null, 'ktoken', data.access_token, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			});
			setErrorMessage('');
			dispatch(setUserData(data));
		} catch (e) {
			console.warn('Register error', e);
			setErrorMessage(e.response.data.message);
		}
	};

	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField name="fullName" label="Имя и фамилия" />
					<FormField name="email" label="Почта" />
					<FormField name="password" label="Пароль" />
					{errorMessage && (
						<Alert severity="error" className="mb-20">
							{errorMessage}
						</Alert>
					)}
					<div className="d-flex align-center">
						<Button
							color="primary"
							variant="contained"
							disabled={!form.formState.isValid || form.formState.isSubmitting}
						>
							Зарегистрироваться
						</Button>
						<Button
							color="primary"
							type="submit"
							variant="text"
							className="ml-10"
							onClick={() => setFormType('login')}
						>
							Войти
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

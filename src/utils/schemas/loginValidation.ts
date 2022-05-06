import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
	email: yup.string().email('Неверная почта').required('Введите почту'),
	password: yup.string().min(6, 'Длинна пароля должна быть более 6 символов').required('Введите пароль'),
}).required();

export const RegisterFormSchema = yup.object().shape({
	fullName: yup.string().required('Имя и фмилия обязательны')
}).concat(LoginFormSchema)

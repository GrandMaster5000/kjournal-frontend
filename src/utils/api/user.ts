import { AxiosInstance } from 'axios';
import { CreateUserDto, LoginUserDto, ResponseUser, User } from './types';

export const UserApi = (instance: AxiosInstance) => ({
	async getAll(): Promise<User[]> {
		const { data } = await instance.get<User[]>('/user');
		return data;
	},
	async register(dto: CreateUserDto): Promise<ResponseUser> {
		const { data } = await instance.post<ResponseUser>('/auth/register', dto);
		return data;
	},
	async login(dto: LoginUserDto): Promise<ResponseUser> {
		const { data } = await instance.post<ResponseUser>('/auth/login', dto);
		return data;
	},
	async getMe(): Promise<User> {
		const { data } = await instance.get<User>('/user/me');
		return data;
	},
});

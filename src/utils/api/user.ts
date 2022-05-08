import { AxiosInstance } from 'axios';
import { CreateUserDto, LoginUserDto, ResponseUser } from './types';

export const UserApi = (instance: AxiosInstance) => ({
	async register(dto: CreateUserDto): Promise<ResponseUser> {
		const { data } = await instance.post<ResponseUser>('/auth/register', dto);
		return data;
	},
	async login(dto: LoginUserDto): Promise<ResponseUser> {
		const { data } = await instance.post<ResponseUser>('/auth/login', dto);
		return data;
	},
	async getMe(): Promise<ResponseUser> {
		const { data } = await instance.get<ResponseUser>('/user/me');
		return data;
	},
});

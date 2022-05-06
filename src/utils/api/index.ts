import axios from 'axios';
import { CreateUserDto, LoginUserDto, ResponseUser } from './types';

const instance = axios.create({
	baseURL: 'http://localhost:3001'
})


export const UserApi = {
	async register(dto: CreateUserDto): Promise<ResponseUser> {
		const { data } = await instance.post<ResponseUser>('/auth/register', dto);
		return data;
	},
	async login(dto: LoginUserDto): Promise<ResponseUser> {
		const { data } = await instance.post<ResponseUser>('/auth/login', dto);
		return data;
	}
}
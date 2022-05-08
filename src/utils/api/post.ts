import { AxiosInstance } from 'axios';
import { CreatePostDto, PostItem, SearchPostDto, SequenceResponce } from './types';

export const PostApi = (instance: AxiosInstance) => ({
	async getAll(): Promise<PostItem[]> {
		const { data } = await instance.get<PostItem[]>('/posts');
		return data;
	},
	async getOne(id: number): Promise<PostItem> {
		const { data } = await instance.post<PostItem>(`/posts/${id}`);
		return data;
	},
	async create(dto: CreatePostDto): Promise<PostItem> {
		const { data } = await instance.post<PostItem>('/posts', dto);
		return data;
	},
	async update(id: number, dto: CreatePostDto): Promise<PostItem> {
		const { data } = await instance.patch<PostItem>(`/posts/${id}`, dto);
		return data;
	},
	async search(dto: SearchPostDto): Promise<SequenceResponce<PostItem>> {
		const { data } = await instance.get<SequenceResponce<PostItem>>(`/posts/search`, {
			params: dto,
		});
		return data;
	},
});

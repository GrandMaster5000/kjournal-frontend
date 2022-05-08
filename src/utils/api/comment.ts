import { AxiosInstance } from 'axios';
import { CommentItem, CreateCommentDto } from './types';

export const CommentApi = (instance: AxiosInstance) => ({
	async getAll(postId: number): Promise<CommentItem[]> {
		const { data } = await instance.get<CommentItem[]>('/comments', { params: { postId } });
		return data;
	},
	async create(dto: CreateCommentDto): Promise<CommentItem> {
		const { data } = await instance.post<CommentItem>('/comments', dto);
		return data;
	},
	async remove(id: number): Promise<any> {
		await instance.delete(`/comments/${id}`);
	},
});

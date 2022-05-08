import { OutputBlockData } from '@editorjs/editorjs';

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface CreateUserDto extends LoginUserDto {
	fullName: string;
}

export type ResponseUser = {
	email: string;
	fullName: string;
	id: number;
	commentsCount?: number;
	access_token: string;
	createdAt: Date;
	updatedAt: Date;
};

export type User = Omit<ResponseUser, 'access_token'>;

export interface CreatePostDto {
	title: string;
	body: OutputBlockData[];
}

enum PostViewsEnum {
	DESC = 'DESC',
	ASC = 'ASC',
}

export interface SearchPostDto extends Partial<CreatePostDto> {
	views?: PostViewsEnum;
	skip?: number;
	take?: number;
}

export interface PostItem extends CreatePostDto {
	id: number;
	views: number;
	tags: string;
	decription: string;
	user: User;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateCommentDto {
	postId: number;
	text: string;
}

export interface CommentItem extends CreateCommentDto {
	id: number;
	post: Omit<PostItem, 'user'>;
	user: User;
	createdAt: Date;
	updatedAt: Date;
}

export interface SequenceResponce<T> {
	items: T[];
	total: number;
}

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

export interface CreatePostDto {
	title: string;
	body: OutputBlockData[];
}

export interface PostItem extends CreatePostDto {
	id: number;
	views: number;
	tags: string;
	decription: string;
	user: ResponseUser;
	createdAt: Date;
	updatedAt: Date;
}

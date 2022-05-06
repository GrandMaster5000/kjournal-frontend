export interface LoginUserDto {
	email: string;
	password: string;
}

export interface CreateUserDto extends LoginUserDto {
	fullName: string;
}

export type ResponseUser = {
	createdAt: string;
	email: string;
	fullName: string;
	id: number;
	commentsCount?: number;
	access_token: string;
	updatedAt: string;
};

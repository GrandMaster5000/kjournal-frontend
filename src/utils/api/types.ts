export interface LoginUserDto {
	email: string;
	password: string;
}

export interface CreateUserDto extends LoginUserDto {
	fullName: string;
}

export interface ResponseUser {
	access_token: string;
}


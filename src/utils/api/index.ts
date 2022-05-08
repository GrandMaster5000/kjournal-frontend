import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { PostApi } from './post';
import { UserApi } from './user';

export type ApiReturnType = {
	user: ReturnType<typeof UserApi>;
	post: ReturnType<typeof PostApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
	const cookies = ctx ? Cookies.get(ctx) : parseCookies();
	const token = cookies.authToken;

	const instance = axios.create({
		baseURL: 'http://localhost:3001',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return {
		user: UserApi(instance),
		post: PostApi(instance),
	};
};

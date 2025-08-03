import { asyncStorage } from './storage';

const ASYNC_STORAGE_AUTH_TOKEN_KEY = 'authToken';

export const asyncAuthStorage = {
	getAuthToken: async () => {
		const token = await asyncStorage?.getItem(ASYNC_STORAGE_AUTH_TOKEN_KEY);
		return token;
	},
	setAuthToken: async (token: string) => {
		await asyncStorage?.setItem(ASYNC_STORAGE_AUTH_TOKEN_KEY, token);
	},
	removeAuthToken: async () => {
		await asyncStorage?.removeItem(ASYNC_STORAGE_AUTH_TOKEN_KEY);
	},
};

import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { Platform } from 'react-native';

type TResult = {
	getToken: (key: string) => Promise<string | null>;
	saveToken: (key: string, token: string) => Promise<void>;
	deleteToken: (key: string) => Promise<void>;
};

const createTokenCache = (): TResult => {
	return {
		getToken: async (key: string) => {
			try {
				const item = await getItemAsync(key);
				if (!item) {
					console.log('we dont have a cache session');
				} else {
					console.log('session restored from cache');
				}

				return item;
			} catch (e) {
				console.error('error to get token', e);
				await deleteItemAsync(key);
				return null;
			}
		},
		saveToken: async (key: string, token: string) => {
			return setItemAsync(key, token);
		},
		deleteToken: async (key: string) => {
			return deleteItemAsync(key);
		},
	};
};

export const tokenCache =
	Platform.OS === 'web' ? undefined : createTokenCache();

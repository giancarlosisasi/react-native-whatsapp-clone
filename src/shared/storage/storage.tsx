/**
 * This module must be compatible in android, ios, and web.
 * To reach that goal we will:
 * - Use expo-secure-store for android and ios
 * - Use localStorage for web
 * We can use the Platform module from react-native to check the platform and use the correct storage.
 * The api for all platforms must be the same.
 */
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface IAsyncStorage {
	getItem: (key: string) => Promise<string | undefined>;
	setItem: (key: string, value: string) => Promise<void>;
	removeItem: (key: string) => Promise<void>;
}

const asyncStorageNative: IAsyncStorage = {
	getItem: async (key) => {
		try {
			const value = (await SecureStore.getItemAsync(key)) || undefined;
			return value;
		} catch (err) {
			await SecureStore.deleteItemAsync(key);
			console.error(err);
		}
	},
	setItem: async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	},
	removeItem: async (key) => {
		await SecureStore.deleteItemAsync(key);
	},
};

/**
 * Localstorage wrapper for web.
 * This uses try-catch to handle cases where we can't access the storage.
 */
export const asyncStorageWeb: IAsyncStorage = {
	getItem: (key) => {
		try {
			// use undefined as it's better than null
			const value = window.localStorage.getItem(key) || undefined;
			return Promise.resolve(value);
		} catch (error) {
			console.error(error);
			window.localStorage.removeItem(key);
			return Promise.resolve(undefined);
		}
	},
	setItem: async (key, value) => {
		try {
			window.localStorage.setItem(key, value);
		} catch (error) {
			console.error(error);
		}
	},
	removeItem: async (key) => {
		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.error(error);
		}
	},
};

export const asyncStorage = Platform.select<IAsyncStorage>({
	ios: asyncStorageNative,
	android: asyncStorageNative,
	web: asyncStorageWeb,
});

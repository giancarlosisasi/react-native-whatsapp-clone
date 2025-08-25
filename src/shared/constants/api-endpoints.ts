import { Platform } from 'react-native';

const nativeApiEndpoint = process.env.EXPO_PUBLIC_GRAPHQL_API_ENDPOINT;
const webApiEndpoint = process.env.EXPO_PUBLIC_GRAPHQL_WEB_API_ENDPOINT;

const getApiEndpoint = () => {
	const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

	if (isNative) {
		if (!nativeApiEndpoint) {
			throw new Error('EXPO_PUBLIC_GRAPHQL_API_ENDPOINT is not set');
		}

		return nativeApiEndpoint;
	}

	if (!webApiEndpoint) {
		throw new Error('EXPO_PUBLIC_GRAPHQL_WEB_API_ENDPOINT is not set');
	}

	return webApiEndpoint;
};

export const API_ENDPOINT = getApiEndpoint();
export const WS_API_ENDPOINT = process.env
	.EXPO_PUBLIC_GRAPHQL_WS_ENDPOINT as string;

const getAuthLogoutUrl = () => {
	const logoutUrl: string | undefined = process.env.EXPO_PUBLIC_AUTH_LOGOUT_URL;

	if (!logoutUrl) {
		throw new Error('EXPO_PUBLIC_AUTH_LOGOUT_URL is not set');
	}

	return logoutUrl;
};

export const AUTH_LOGOUT_URL = getAuthLogoutUrl();

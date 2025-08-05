import {
	type AuthRequestConfig,
	makeRedirectUri,
	useAuthRequest,
} from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useContext, useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { AUTH_LOGOUT_URL } from '../constants/api-endpoints';
import {
	AUTH_CLIENT_TYPE,
	AUTH_GOOGLE_OAUTH_URL,
	AUTH_GOOGLE_OAUTH_URL_WEB,
} from '../constants/auth';
import { isMobile } from '../constants/platform';
import type { authV2GetMeQuery } from './__generated__/authV2GetMeQuery.graphql';
import { useAuthToken } from './auth-token';

type TAuthUser = authV2GetMeQuery['response']['me'];

type TAuthContext = {
	user: TAuthUser | undefined;
	isLoading: boolean;
	error: Error | undefined;
	signin: () => Promise<void>;
	signout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

const config: AuthRequestConfig = {
	clientId: 'google',
	scopes: [],
	redirectUri: makeRedirectUri({
		scheme: 'luna',
		path: 'chats',
	}),
	extraParams: {
		client_type: AUTH_CLIENT_TYPE,
	},
};

const discovery = {
	authorizationEndpoint: AUTH_GOOGLE_OAUTH_URL,
};

const GET_ME_QUERY = graphql`
	query authV2GetMeQuery {
		me {
			id
			name
			email
			avatarUrl
			createdAt
			updatedAt
		}
	}
`;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { authToken, removeAuthToken } = useAuthToken();

	const data = useLazyLoadQuery<authV2GetMeQuery>(
		GET_ME_QUERY,
		{},
		{
			fetchPolicy: 'store-and-network',
			fetchKey: authToken,
		},
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const [_, __, promptAsync] = useAuthRequest(config, discovery);

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	const signin = async () => {
		if (isMobile) {
			await promptAsync();
			return;
		}

		// web
		window.location.href = AUTH_GOOGLE_OAUTH_URL_WEB;
	};

	const signout = async () => {
		if (isMobile) {
			console.log('[Native] - [context/auth] - signout called');
			await removeAuthToken();
			router.replace('/');
			return;
		}

		// in web, we must make a GET request to the logout url
		console.log('[Web] - [context/auth] - signout called', { AUTH_LOGOUT_URL });
		// this will clear the auth cookies
		await fetch(AUTH_LOGOUT_URL, {
			method: 'GET',
		});
		window.location.href = '/';
	};

	return (
		<AuthContext.Provider
			value={{ user: data.me, isLoading, error, signin, signout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

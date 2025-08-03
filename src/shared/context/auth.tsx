import {
	type AuthRequestConfig,
	makeRedirectUri,
	useAuthRequest,
} from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { createContext, useContext, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { AUTH_GOOGLE_OAUTH_URL } from '../constants/auth';
import { asyncAuthStorage } from '../storage/auth-storage';
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

const HTTP_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_API_ENDPOINT;

if (!HTTP_ENDPOINT) {
	throw new Error('EXPO_PUBLIC_GRAPHQL_API_ENDPOINT is not set');
}

const config: AuthRequestConfig = {
	clientId: 'google',
	scopes: [],
	redirectUri: makeRedirectUri({
		scheme: 'whatstappgio',
		path: 'chats',
	}),
	extraParams: {
		client_type: 'mobile',
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

	const signin = async () => {
		promptAsync();
	};

	const signout = async () => {
		await removeAuthToken();
		router.replace('/');
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

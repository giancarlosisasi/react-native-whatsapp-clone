import {
	type AuthRequestConfig,
	makeRedirectUri,
	useAuthRequest,
} from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { AUTH_GOOGLE_OAUTH_URL } from '../constants/auth';
import { asyncAuthStorage } from '../storage/auth-storage';
import type { authV2GetMeQuery } from './__generated__/authV2GetMeQuery.graphql';
import { useRelay } from './relay';

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

	const [fetchKey, setRefetchKey] = useState<string | undefined>(undefined);
	const data = useLazyLoadQuery<authV2GetMeQuery>(
		GET_ME_QUERY,
		{},
		{
			fetchPolicy: 'store-and-network',
			fetchKey,
		},
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const { setupRelayEnvironment, relayEnvironment } = useRelay();

	const [_, __, promptAsync] = useAuthRequest(config, discovery);

	useEffect(() => {
		const getAuthToken = async () => {
			try {
				const token = await asyncAuthStorage.getAuthToken();
				await setupRelayEnvironment(token);
			} catch (err) {
				console.error('Error to get the auth token from the storage: ', err);
				Alert.alert(
					'Ups! Ocurrió un error al intentar autenticarte.',
					'Por favor, intenta nuevamente más tarde.',
					[
						{
							text: 'OK',
							onPress: () => {
								router.replace('/');
							},
						},
					],
				);
			}
		};

		getAuthToken();
	}, [router, setupRelayEnvironment]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: the relayEnvironment will only change when a new authToken is set (after google oauth login)
	useEffect(() => {
		const randomKey = Date.now().toString();
		setRefetchKey(randomKey);
	}, [relayEnvironment]);

	const signin = async () => {
		promptAsync();
	};

	const signout = async () => {
		console.log('auth provider - signing out');
		await asyncAuthStorage.removeAuthToken();
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

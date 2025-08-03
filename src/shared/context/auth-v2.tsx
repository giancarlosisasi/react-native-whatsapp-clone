// this version uses the golang backend instead of expo api routes

import {
	type AuthRequestConfig,
	makeRedirectUri,
	useAuthRequest,
} from 'expo-auth-session';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { AUTH_GOOGLE_OAUTH_URL } from '../constants/auth';
import { asyncAuthStorage } from '../storage/auth-storage';

type TAuthUser = {
	id: string;
	name: string;
	email: string;
	avatarUrl?: string;
	createdAt: string;
	updatedAt: string;
};

type TAuthContext = {
	user: TAuthUser | undefined;
	isLoading: boolean;
	error: Error | undefined;
	signin: () => Promise<void>;
	signout: () => Promise<void>;
	saveAuthToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<TAuthUser | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [authToken, setAuthToken] = useState<string | undefined>(undefined);

	const [_, __, promptAsync] = useAuthRequest(config, discovery);

	useEffect(() => {
		const getAuthToken = async () => {
			const token = await asyncAuthStorage.getAuthToken();

			console.log('token', token);
		};

		getAuthToken();
	}, []);

	const signin = async () => {
		promptAsync();
	};

	const signout = async () => {
		await asyncAuthStorage.removeAuthToken();
		setUser(undefined);
		setAuthToken(undefined);
	};

	const saveAuthToken = useCallback(async (token: string) => {
		await asyncAuthStorage.setAuthToken(token);
		setAuthToken(token);
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isLoading, error, signin, signout, saveAuthToken }}
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

// this version uses the golang backend instead of expo api routes

import {
	type AuthRequestConfig,
	makeRedirectUri,
	useAuthRequest,
} from 'expo-auth-session';
import { createContext, useContext, useEffect, useState } from 'react';
import {
	APP_SCHEME,
	AUTH_GOOGLE_OAUTH_LOGOUT_URL,
	AUTH_GOOGLE_OAUTH_URL,
} from '../constants/auth';

export type TAuthUser = {
	id: string;
	name: string;
	email: string;
	avatarUrl?: string;
	createdAt: string;
	updatedAt: string;
};

type TAuthContext = {
	user: TAuthUser | null;
	isLoading: boolean;
	error: Error | null;
	signin: () => Promise<void>;
	signout: () => Promise<void>;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

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
	// tokenEndpoint: AUTH_GOOGLE_OAUTH_URL,
	// revocationEndpoint: AUTH_GOOGLE_OAUTH_LOGOUT_URL,
};

// https://golang-whatsapp-clone.vercel.app/chats
console.log('config', { config, discovery });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<TAuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const [request, response, promptAsync] = useAuthRequest(config, discovery);

	useEffect(() => {
		if (response?.type === 'success') {
			console.log({ response: JSON.stringify(response, null, 2) });
		}
	}, [response]);

	const signin = async () => {
		promptAsync();
	};

	const signout = async () => {};

	return (
		<AuthContext.Provider value={{ user, isLoading, error, signin, signout }}>
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

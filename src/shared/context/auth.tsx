import {
	type AuthError,
	type AuthRequest,
	type AuthRequestConfig,
	type AuthSessionResult,
	type DiscoveryDocument,
	exchangeCodeAsync,
	makeRedirectUri,
	useAuthRequest,
} from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { decodeJwt } from 'jose';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Platform } from 'react-native';
import { BASE_URL, TOKEN_KEY_NAME } from '../constants/auth';
import { tokenCache } from '../storage/cache';

maybeCompleteAuthSession();

export type TAuthUser = {
	sub: string;
	email: string;
	name: string;
	picture?: string;
	given_name?: string;
	family_name?: string;
	email_verified?: boolean;
	provider?: string; // for now only google
	exp?: number;
	cookieExpiration?: number; // added for web cookies expiration tracking
};

type TAuthContext = {
	user: TAuthUser | null;
	signin: () => Promise<void>;
	signout: () => Promise<void>;
	fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
	isLoading: boolean;
	error: AuthError | null;
};

const config: AuthRequestConfig = {
	clientId: 'google',
	scopes: ['openid', 'profile', 'email'],
	redirectUri: makeRedirectUri(),
};

const discovery: DiscoveryDocument = {
	authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
	tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<TAuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<AuthError | null>(null);

	const router = useRouter();

	const [accessToken, setAccessToken] = useState<string | null>(null);

	const [request, response, promptAsync] = useAuthRequest(config, discovery);
	const isWeb = Platform.OS === 'web';

	useEffect(() => {
		handleResponse(request, response);
	}, [request, response]);

	useEffect(() => {
		const restoreSession = async () => {
			setIsLoading(true);
			try {
				if (isWeb) {
					const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`, {
						method: 'GET',
						credentials: 'include', // include cookies in web request
					});

					if (sessionResponse.ok) {
						const userData = await sessionResponse.json();
						setUser(userData as TAuthUser);
						router.replace('/(tabs)/chats');
					}
				} else {
					const storedAccessToken = await tokenCache?.getToken(TOKEN_KEY_NAME);
					// todo: refresh token if needed
					if (storedAccessToken) {
						try {
							const decoded = decodeJwt(storedAccessToken);
							const exp = (decoded as any).exp;
							const now = Math.floor(Date.now() / 1000);

							if (exp && exp > now) {
								console.log('access token is still valid');
								setUser(decoded as TAuthUser);
								setAccessToken(storedAccessToken);
							} else {
								setUser(null);
								tokenCache?.deleteToken(TOKEN_KEY_NAME);
							}
							// } else if (storedRefreshToken) {
							// 	console.log('access token is expired, refreshing...');
							// }

							router.replace('/(tabs)/chats');
						} catch (e) {
							console.error('error to restore mobile session', e);
						}
					} else {
						console.log('User is not authenticated');
					}
				}
			} catch (err) {
				console.error('error to restore session', err);
			} finally {
				setIsLoading(false);
			}
		};

		restoreSession();
	}, [isWeb, router]);

	const handleResponse = useCallback(
		async (req: AuthRequest | null, res: AuthSessionResult | null) => {
			if (res?.type === 'success') {
				const { code } = res.params;
				setIsLoading(true);
				try {
					const formData = new FormData();
					formData.append('code', code);

					if (isWeb) {
						formData.append('platform', 'web');
					}

					if (req?.codeVerifier) {
						formData.append('codeVerifier', req.codeVerifier);
					} else {
						console.warn('no code verifier found in the request');
					}

					const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
						method: 'POST',
						body: formData,
						credentials: isWeb ? 'include' : 'same-origin', // include cookies in web
					});

					if (isWeb) {
						const userData = await tokenResponse.json();
						if (userData.success) {
							const sessionResponse = await fetch(
								`${BASE_URL}/api/auth/session`,
								{
									method: 'GET',
									credentials: 'include',
								},
							);

							if (sessionResponse.ok) {
								const sessionData = await sessionResponse.json();
								setUser(sessionData as TAuthUser);
								router.replace('/(tabs)/chats');
							}
						}
					} else {
						const token = await tokenResponse.json();
						const accessToken = token.accessToken;
						if (!accessToken) {
							console.error('no access token');
							return;
						}

						setAccessToken(accessToken);
						// save token to local storage
						tokenCache?.saveToken(TOKEN_KEY_NAME, accessToken);

						// get user info
						const decoded = decodeJwt(accessToken);
						setUser(decoded as TAuthUser);
						router.replace('/(tabs)/chats');
					}

					// const tokenResponse = await exchangeCodeAsync(
					// 	{
					// 		code: code,
					// 		extraParams: {
					// 			params: Platform.OS,
					// 		},
					// 		clientId: 'google',
					// 		redirectUri: makeRedirectUri(),
					// 	},
					// 	discovery,
					// );
				} catch (err) {
					console.error(err);
				} finally {
					setIsLoading(false);
				}
			} else if (res?.type === 'error') {
				console.error(res.error);
				setError(res.error as AuthError);
			}
		},
		[isWeb, router],
	);

	const signin = async () => {
		try {
			if (!request) {
				console.log('no request');
				return;
			}
			await promptAsync();
		} catch (err) {
			console.error(err);
		}
	};

	const signout = async () => {
		// clear cookie and token
		// set state to null
		if (isWeb) {
			// For web: Call logout endpoint to clear the cookie
			try {
				await fetch(`${BASE_URL}/api/auth/logout`, {
					method: 'POST',
					credentials: 'include',
				});
			} catch (error) {
				console.error('Error during web logout:', error);
			}
		} else {
			// For native: Clear both tokens from cache
			await tokenCache?.deleteToken('accessToken');
			await tokenCache?.deleteToken('refreshToken');
		}

		// Clear state
		setUser(null);
		setAccessToken(null);
	};

	const fetchWithAuth = async (url: string, options?: RequestInit) => {
		if (isWeb) {
			const response = await fetch(url, {
				...options,
				credentials: 'include',
			});

			if (response.status === 401) {
				console.log(
					'API request failed with 401, attempting to refresh token...',
				);
				// await refreshToken();
			}
			return response;
		} else {
			const response = await fetch(url, {
				...options,
				headers: {
					...options?.headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.status === 401) {
				console.log(
					'API request failed with 401, attempting to refresh token...',
				);
				// await refreshToken();
			}

			return response;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				signin,
				signout,
				fetchWithAuth,
				error,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

export const useMe = () => {
	const { user } = useAuth();

	if (!user) {
		throw new Error(
			'the user doesn`t exist, maybe you have forgot to sign in?',
		);
	}

	return { user };
};

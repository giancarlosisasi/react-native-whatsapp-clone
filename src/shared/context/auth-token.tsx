import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { FullScreenActivityIndicator } from '../components/full-screen-activity-indicator';
import { asyncAuthStorage } from '../storage/auth-storage';

// prevent the splash screen from auto-hiding before asset loading is complete
// the .hide method is called in the `src\shared\context\auth.tsx` file because that is the final loading state we need to handle
SplashScreen.preventAutoHideAsync();

type TAuthTokenContext = {
	authToken: string | undefined;
	saveAuthToken: (token: string) => Promise<void>;
	removeAuthToken: () => Promise<void>;
};

const authTokenContext = createContext<TAuthTokenContext | undefined>(
	undefined,
);

export const AuthTokenProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [authToken, setAuthToken] = useState<string | undefined>(undefined);

	useEffect(() => {
		console.log('fetching auth token');
		const fetchToken = async () => {
			setIsLoading(true);
			try {
				const token = await asyncAuthStorage.getAuthToken();
				setAuthToken(token);
			} catch (err) {
				console.error(
					'[context/auth-token]: error to get the auth token: ',
					err,
				);
				await asyncAuthStorage.removeAuthToken();
				router.replace('/');
			} finally {
				setIsLoading(false);
			}
		};
		fetchToken();
	}, [router]);

	const saveAuthToken = useCallback(async (token: string) => {
		setAuthToken(token);
		await asyncAuthStorage.setAuthToken(token);
	}, []);

	const removeAuthToken = useCallback(async () => {
		setAuthToken(undefined);
		await asyncAuthStorage.removeAuthToken();
	}, []);

	if (isLoading) {
		return <FullScreenActivityIndicator />;
	}

	return (
		<authTokenContext.Provider
			value={{ authToken, saveAuthToken, removeAuthToken }}
		>
			{children}
		</authTokenContext.Provider>
	);
};

export const useAuthToken = () => {
	const context = useContext(authTokenContext);

	if (!context) {
		throw new Error('useAuthToken must be used within an AuthTokenProvider');
	}

	return context;
};

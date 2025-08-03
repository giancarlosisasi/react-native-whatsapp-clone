import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Text, View } from 'react-native';
import { RelayEnvironmentProvider } from 'react-relay';
import { Environment, type FetchFunction, Network } from 'relay-runtime';
import { FullScreenActivityIndicator } from '../components/full-screen-activity-indicator';
import { asyncAuthStorage } from '../storage/auth-storage';

const HTTP_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_API_ENDPOINT;

if (!HTTP_ENDPOINT) {
	throw new Error('EXPO_PUBLIC_GRAPHQL_API_ENDPOINT is not set');
}

const context = createContext<
	| {
			setupRelayEnvironment: (authToken?: string) => Promise<void>;
			relayEnvironment: Environment;
	  }
	| undefined
>(undefined);

export const RelayProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const [relayEnvironment, setRelayEnvironment] = useState<
		Environment | undefined
	>(undefined);

	const setupRelayEnvironment = useCallback(async (authToken?: string) => {
		console.log(
			'> Setting up relay environment using the auth token: ',
			authToken || 'undefined',
		);

		setLoading(true);
		const fetchGraphQL: FetchFunction = async (request, variables) => {
			console.log('fetching graphql', { authToken, HTTP_ENDPOINT });
			const headers: RequestInit['headers'] = {
				'Content-Type': 'application/json',
			};

			if (authToken) {
				headers.Authorization = `Bearer ${authToken}`;
			}

			const resp = await fetch(HTTP_ENDPOINT, {
				method: 'POST',
				headers,
				body: JSON.stringify({ query: request.text, variables }),
			});

			if (!resp.ok) {
				throw new Error('Response failed.');
			}

			return await resp.json();
		};

		const environment = new Environment({
			network: Network.create(fetchGraphQL),
		});

		setRelayEnvironment(environment);
		setLoading(false);
	}, []);

	useEffect(() => {
		const setup = async () => {
			const authToken = await asyncAuthStorage.getAuthToken();
			await setupRelayEnvironment(authToken);
		};

		setup();
	}, [setupRelayEnvironment]);

	if (loading) {
		return <FullScreenActivityIndicator />;
	}

	if (!relayEnvironment) {
		console.error('Relay environment not found');
		return (
			<View>
				<Text>A critical error occurred while setting up the application.</Text>
			</View>
		);
	}

	return (
		<RelayEnvironmentProvider environment={relayEnvironment}>
			<context.Provider value={{ setupRelayEnvironment, relayEnvironment }}>
				{children}
			</context.Provider>
		</RelayEnvironmentProvider>
	);
};

export const useRelay = () => {
	const relayContext = useContext(context);

	if (typeof relayContext === 'undefined') {
		throw new Error('useRelay must be used within a RelayProvider');
	}

	return relayContext;
};

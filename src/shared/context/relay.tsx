import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RelayEnvironmentProvider } from 'react-relay';
import { Environment, type FetchFunction, Network } from 'relay-runtime';
import { FullScreenActivityIndicator } from '../components/full-screen-activity-indicator';
import { useAuthToken } from './auth-token';

const HTTP_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_API_ENDPOINT;

if (!HTTP_ENDPOINT) {
	throw new Error('EXPO_PUBLIC_GRAPHQL_API_ENDPOINT is not set');
}

export const RelayProvider = ({ children }: { children: React.ReactNode }) => {
	const { authToken } = useAuthToken();

	const [loading, setLoading] = useState(true);
	const [relayEnvironment, setRelayEnvironment] = useState<
		Environment | undefined
	>(undefined);

	const setupRelayEnvironment = useCallback(async (authToken?: string) => {
		setLoading(true);
		const fetchGraphQL: FetchFunction = async (request, variables) => {
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

	// the auth token will only change when a new user session is created (user logs in)
	useEffect(() => {
		console.log('setting up relay environment');
		setupRelayEnvironment(authToken);
	}, [setupRelayEnvironment, authToken]);

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
			{children}
		</RelayEnvironmentProvider>
	);
};

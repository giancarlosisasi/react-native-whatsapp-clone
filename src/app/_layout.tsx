import { Stack } from 'expo-router';
import { Suspense } from 'react';
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';
import { RootErrorBoundary } from '@/shared/components/root-error-boundary';
import { AuthProvider, useAuth } from '@/shared/context/auth';
import { AuthTokenProvider } from '@/shared/context/auth-token';
import { RelayProvider } from '@/shared/context/relay';

function InitialLayout() {
	const { user } = useAuth();

	const isAuthenticated = !!user;

	return (
		<Stack>
			<Stack.Protected guard={!isAuthenticated}>
				<Stack.Screen
					name='index'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name='sign-in' options={{ headerShown: false }} />
				<Stack.Screen name='auth/[token]' options={{ headerShown: false }} />
			</Stack.Protected>

			<Stack.Protected guard={isAuthenticated}>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack.Protected>
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<RootErrorBoundary>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<Suspense fallback={<FullScreenActivityIndicator />}>
					<AuthTokenProvider>
						<RelayProvider>
							<AuthProvider>
								<InitialLayout />
							</AuthProvider>
						</RelayProvider>
					</AuthTokenProvider>
				</Suspense>
			</SafeAreaProvider>
		</RootErrorBoundary>
	);
}

import { Stack } from 'expo-router';
import { Suspense } from 'react';
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';
import { RootErrorBoundary } from '@/shared/components/root-error-boundary';
import { AuthProvider } from '@/shared/context/auth';
import { AuthTokenProvider } from '@/shared/context/auth-token';
import { RelayProvider } from '@/shared/context/relay';

function InitialLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name='sign-in' options={{ headerShown: false }} />
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen name='auth/[token]' options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<RootErrorBoundary>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<AuthTokenProvider>
					<RelayProvider>
						<Suspense fallback={<FullScreenActivityIndicator />}>
							<AuthProvider>
								<InitialLayout />
							</AuthProvider>
						</Suspense>
					</RelayProvider>
				</AuthTokenProvider>
			</SafeAreaProvider>
		</RootErrorBoundary>
	);
}

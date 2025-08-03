import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/shared/context/auth-relay';

// prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

import { Suspense } from 'react';
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';
import { RootErrorBoundary } from '@/shared/components/root-error-boundary';
import { RelayProvider } from '@/shared/context/relay';

function InitialLayout() {
	return (
		<Stack>
			<Stack.Screen name='auth/[token]' options={{ headerShown: false }} />
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name='sign-in' options={{ headerShown: false }} />
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<RootErrorBoundary>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<Suspense fallback={<FullScreenActivityIndicator />}>
					<RelayProvider>
						<AuthProvider>
							<InitialLayout />
						</AuthProvider>
					</RelayProvider>
				</Suspense>
			</SafeAreaProvider>
		</RootErrorBoundary>
	);
}

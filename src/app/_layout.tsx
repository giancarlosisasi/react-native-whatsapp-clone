// import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
// import { tokenCache } from '@clerk/clerk-expo/token-cache';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from '@/shared/context/auth-v2';

// import { colors } from '@/theme/colors';

// prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';

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
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<AuthProvider>
				<InitialLayout />
			</AuthProvider>
		</SafeAreaProvider>
	);
}

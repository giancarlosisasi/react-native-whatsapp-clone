import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';

function InitialLayout() {
	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<Stack>
				<Stack.Screen
					name='index'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='otp'
					options={{
						headerTitle: 'Enter Your Phone Number',
						headerBackVisible: false,
					}}
				/>

				<Stack.Screen
					name='verify/[phone]'
					options={{
						headerTitle: 'Verify Your Phone Number',
						headerBackVisible: true,
						headerBackTitle: 'Edit number',
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	);
}

export default function RootLayout() {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<InitialLayout />
		</ClerkProvider>
	);
}

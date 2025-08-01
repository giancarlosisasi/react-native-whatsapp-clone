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
	// const router = useRouter();
	// const segments = useSegments();

	// const { isLoaded, isSignedIn } = useAuth();
	const { isLoading, user } = useAuth();
	console.log('user', { isLoading, user });

	// useEffect(() => {
	// 	if (!isLoading) {
	// 		SplashScreen.hideAsync();
	// 	}
	// }, [isLoading]);

	// // biome-ignore lint/correctness/useExhaustiveDependencies: we are not going to depends on segments, this logic must be only run in the first render
	// useEffect(() => {
	// 	if (!isLoaded) {
	// 		return;
	// 	}

	// 	const inTabsGroup = segments[0] === '(tabs)';

	// 	if (isSignedIn && !inTabsGroup) {
	// 		router.replace('/(tabs)/chats');
	// 	} else if (!isSignedIn) {
	// 		router.replace('/');
	// 	}
	// }, [isSignedIn, isLoaded, router]);

	// if (!isLoaded) {
	// 	return (
	// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	// 			<ActivityIndicator color={colors.primary} />
	// 		</View>
	// 	);
	// }

	// if (isLoading) {
	// 	return (
	// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	// 			<ActivityIndicator color={colors.primary} />
	// 		</View>
	// 	);
	// }

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<Stack>
				<Stack.Screen name='auth/[token]' options={{ headerShown: false }} />
				{/* <Stack.Protected guard={!user}> */}
				<Stack.Screen
					name='index'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name='sign-in' options={{ headerShown: false }} />
				{/* </Stack.Protected> */}
				{/* <Stack.Protected guard={!!user}> */}
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				{/* </Stack.Protected> */}
				{/* <Stack.Screen
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
				/> */}
			</Stack>
		</SafeAreaProvider>
	);
}

export default function RootLayout() {
	return (
		// <ClerkProvider tokenCache={tokenCache}>
		<AuthProvider>
			<InitialLayout />
		</AuthProvider>
		// </ClerkProvider>
	);
}

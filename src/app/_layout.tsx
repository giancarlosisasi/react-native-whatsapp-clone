import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import { Suspense } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';
import { RootErrorBoundary } from '@/shared/components/root-error-boundary';
import { AuthProvider, useAuth } from '@/shared/context/auth';
import { AuthTokenProvider } from '@/shared/context/auth-token';
import { RelayProvider } from '@/shared/context/relay';
import { colors } from '@/theme/colors';

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
				<Stack.Screen
					name='(modals)/new-chat'
					options={{
						presentation: 'modal',
						title: 'New Chat',
						headerTransparent: true,
						headerBlurEffect: 'regular',
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerSearchBarOptions: {
							placeholder: 'Search name or number',
							hideWhenScrolling: true,
						},
						headerRight: () => (
							<Link href='/(tabs)/chats' asChild>
								<TouchableOpacity
									style={{
										backgroundColor: colors.lightGray,
										borderRadius: 20,
										padding: 4,
									}}
								>
									<Ionicons name='close' color={colors.gray} size={30} />
								</TouchableOpacity>
							</Link>
						),
					}}
				/>
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

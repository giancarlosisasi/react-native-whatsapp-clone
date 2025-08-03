import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { useAuthToken } from '@/shared/context/auth-token';
import { colors } from '@/theme/colors';

export default function AuthToken() {
	const { token } = useLocalSearchParams<{ token: string }>();
	const router = useRouter();

	const { saveAuthToken } = useAuthToken();

	const failedToProcessToken = useCallback(() => {
		() => {
			Alert.alert(
				'Ups! Ocurrió un error',
				'El proceso de autenticación falló. Por favor, intenta nuevamente.',
				[
					{
						text: 'Reintentar',
						onPress: () => {
							router.replace('/');
						},
					},
				],
			);
		};
	}, [router]);

	useEffect(() => {
		console.log('auth/[token] page - processing token');
		const processAuthToken = async (token: string) => {
			if (token) {
				try {
					await saveAuthToken(token);
					router.replace('/(tabs)/chats');
				} catch (error) {
					console.error(error);
					failedToProcessToken();
				}
			} else {
				failedToProcessToken();
			}
		};

		processAuthToken(token);
	}, [token, router, saveAuthToken, failedToProcessToken]);

	console.log('auth token page - token', token);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				gap: 20,
				flexDirection: 'column',
			}}
		>
			<ActivityIndicator color={colors.primary} />
			<Text>Authenticating...</Text>
		</View>
	);
}

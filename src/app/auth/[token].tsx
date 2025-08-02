import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export default function AuthToken() {
	const { token } = useLocalSearchParams();

	console.log('token', token);

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

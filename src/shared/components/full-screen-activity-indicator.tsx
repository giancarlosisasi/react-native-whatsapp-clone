import { ActivityIndicator, View } from 'react-native';
import { colors } from '@/theme/colors';

export const FullScreenActivityIndicator = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator color={colors.primary} />
		</View>
	);
};

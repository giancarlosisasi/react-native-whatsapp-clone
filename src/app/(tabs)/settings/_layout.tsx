import { Stack } from 'expo-router';
import { colors } from '@/theme/colors';

export default function SettingsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: 'Settings',
					headerLargeTitle: true,
					headerShadowVisible: false,
					headerStyle: { backgroundColor: colors.background },
					headerSearchBarOptions: {
						placeholder: 'Search',
					},
				}}
			/>
		</Stack>
	);
}

import { Stack } from 'expo-router';
import { colors } from '@/theme/colors';

export default function CallsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: 'Calls',
					headerLargeTitle: true,
					headerTransparent: true,
					headerBlurEffect: 'regular',
					headerStyle: { backgroundColor: colors.background },
					headerSearchBarOptions: {
						placeholder: 'Search',
					},
				}}
			/>
		</Stack>
	);
}

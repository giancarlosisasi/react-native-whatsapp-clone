import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';
import { View } from '@/shared/ui/base';
import { colors } from '@/theme/colors';

export default function ChatsLayout() {
	const isIOS = Platform.OS === 'ios';

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: 'Chats',
					headerSearchBarOptions: {
						placeholder: 'Search',
					},
					headerTransparent: true,
					headerLargeTitle: true,
					headerBlurEffect: 'regular',
					...(!isIOS && {
						headerTitleStyle: {
							fontSize: 28,
							fontWeight: 'bold',
						},
					}),
					headerStyle: {
						backgroundColor: colors.white,
					},
					headerLeft: () => (
						<TouchableOpacity>
							<Ionicons
								name='ellipsis-horizontal-circle-outline'
								color={colors.primary}
								size={30}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<View style={{ flexDirection: 'row', gap: 30 }}>
							<TouchableOpacity>
								<Ionicons
									name='camera-outline'
									color={colors.primary}
									size={30}
								/>
							</TouchableOpacity>
							<Link href='/' asChild>
								<TouchableOpacity>
									<Ionicons
										name='add-circle'
										color={colors.primary}
										size={30}
									/>
								</TouchableOpacity>
							</Link>
						</View>
					),
				}}
			/>
		</Stack>
	);
}

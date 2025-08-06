import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import { Platform, Text, Touchable, TouchableOpacity } from 'react-native';
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
							<Link href='(modals)/new-chat' asChild>
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
			<Stack.Screen
				name='[id]'
				options={{
					title: '',
					// headerBackVisible: false,
					headerTitle: () => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-start',
								gap: 10,
								paddingBottom: 4,
							}}
						>
							<Image
								source={{
									uri: 'https://avatar.iran.liara.run/public/17',
								}}
								style={{
									width: 40,
									height: 40,
									borderRadius: 40,
								}}
							/>
							<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
								Simon Grimm
							</Text>
						</View>
					),
					headerRight: () => (
						<View style={{ flexDirection: 'row', gap: 30 }}>
							<TouchableOpacity>
								<Ionicons
									name='videocam-outline'
									size={30}
									color={colors.primary}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Ionicons
									name='call-outline'
									color={colors.primary}
									size={30}
								/>
							</TouchableOpacity>
						</View>
					),
					headerStyle: {
						backgroundColor: colors.background,
					},
				}}
			/>
		</Stack>
	);
}

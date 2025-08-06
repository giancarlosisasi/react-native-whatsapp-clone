import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '@/theme/colors';

export default function TabLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Tabs
				screenOptions={{
					tabBarStyle: {
						backgroundColor: colors.background,
					},
					tabBarActiveTintColor: colors.primary,
					tabBarInactiveBackgroundColor: colors.background,
					tabBarActiveBackgroundColor: colors.background,
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerShadowVisible: false,
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						headerShown: false,
						href: null,
					}}
				/>
				<Tabs.Screen
					name='updates'
					options={{
						title: 'Updates',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons size={size} name='update' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='calls'
					options={{
						title: 'Calls',
						headerShown: false,
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								size={size}
								name='phone-outline'
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='communities'
					options={{
						title: 'Communities',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons size={size} name='people' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='chats'
					options={{
						title: 'Chats',
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name='chatbubbles' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='settings'
					options={{
						headerShown: false,
						title: 'Settings',
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name='cog' color={color} />
						),
					}}
				/>
			</Tabs>
		</GestureHandlerRootView>
	);
}

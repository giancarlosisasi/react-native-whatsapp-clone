import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '@/theme/colors';

export default function TabLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Tabs screenOptions={{ headerShown: false }}>
				<Tabs.Screen
					name='updates'
					options={{
						title: 'Chats',
						tabBarShowLabel: false,
						tabBarActiveTintColor: colors.primary,
						tabBarInactiveTintColor: colors.gray,
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name='comments' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='chats'
					options={{
						title: 'Chats',
						tabBarShowLabel: false,
						tabBarActiveTintColor: colors.primary,
						tabBarInactiveTintColor: colors.gray,
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name='comments' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='calls'
					options={{
						title: 'Calls',
						tabBarShowLabel: false,
						tabBarActiveTintColor: colors.primary,
						tabBarInactiveTintColor: colors.gray,
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name='phone' color={color} />
						),
					}}
				/>
			</Tabs>
		</GestureHandlerRootView>
	);
}

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { colors } from '@/theme/colors';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
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
		</Tabs>
	);
}

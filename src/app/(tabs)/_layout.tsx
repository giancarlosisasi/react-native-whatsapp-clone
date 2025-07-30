import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Tabs>
				<Tabs.Screen
					name='chats'
					options={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name='chat' color={color} size={size} />
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}

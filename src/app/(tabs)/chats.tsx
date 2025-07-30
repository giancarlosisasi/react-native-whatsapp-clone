import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth, useMe } from '@/shared/context/auth';

export default function Chats() {
	const { signout } = useAuth();
	const { user } = useMe();

	return (
		<View style={styles.container}>
			<Text>chats page!</Text>
			<Text>{user.name}</Text>
			<Text>{user.sub}</Text>
			<Text>{user.email}</Text>
			<Button
				title='logout'
				onPress={() => {
					signout();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

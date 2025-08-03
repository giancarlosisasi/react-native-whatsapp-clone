import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useAuth } from '@/shared/context/auth-v2';
import { colors } from '@/theme/colors';

export default function Chats() {
	const { user, isLoading, signout } = useAuth();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator color={colors.primary} />
			</View>
		);
	}

	if (!user) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>You are not logged in</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text>chats page!</Text>
			{/* <Text>{user.id}</Text>
			<Text>{user.email}</Text>
			<Text>{user.name}</Text>
			<Text>{user.avatarUrl}</Text>
			<Text>{user.createdAt}</Text>
			<Text>{user.updatedAt}</Text>
			<Button
				title='logout'
				onPress={() => {
					signout();
				}}
			/> */}
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

import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/shared/context/auth';
import { colors } from '@/theme/colors';

export const LoginForm = () => {
	const { signin, signout } = useAuth();

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={signin}>
				<AntDesign name='google' size={24} color={colors.white} />
				<Text style={styles.buttonText}>Continue with Google</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={signout}>
				<Text style={styles.buttonText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		padding: 10,
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		backgroundColor: colors.primary,
		borderRadius: 10,
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
});

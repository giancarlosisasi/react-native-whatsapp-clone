import { Image } from 'expo-image';
import { Link } from 'expo-router';
import {
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { colors } from '@/theme/colors';
import welcomeImage from '../../assets/images/welcome.png';

export default function Index() {
	const openLink = () => {
		Linking.openURL('https://www.google.com');
	};

	return (
		<View style={styles.container}>
			<Image source={welcomeImage} style={styles.welcomeImage} />
			<Text style={styles.headline}>Welcome to Luna</Text>

			<Text style={styles.description}>
				Read our{' '}
				<Text style={styles.link} onPress={openLink}>
					Privacy Policy
				</Text>
				. {'Tab "Agree & Continue" to accept the '}
				<Text style={styles.link} onPress={openLink}>
					Terms of Service
				</Text>
				.
			</Text>
			<Link href='/sign-in' asChild>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Agree & Continue</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
	},
	box: {
		width: 100,
		height: 80,
		backgroundColor: 'black',
		margin: 30,
	},
	welcomeImage: {
		width: '100%',
		height: 300,
		marginBottom: 80,
	},
	headline: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 20,
	},
	description: {
		fontSize: 14,
		textAlign: 'center',
		marginBottom: 80,
		color: colors.gray,
	},
	link: {
		color: colors.primary,
	},
	button: {
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 22,
		color: colors.primary,
		fontWeight: 'bold',
	},
});

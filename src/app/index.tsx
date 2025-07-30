import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useAuth } from '@/shared/context/auth';
import { colors } from '@/theme/colors';
import { LoginForm } from '@/views/auth/components/login-form';
import welcomeImage from '../../assets/images/welcome.png';

export default function Index() {
	const [view, setView] = useState<'login' | 'welcome'>('welcome');
	const { isLoading, user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && user) {
			router.replace('/(tabs)/chats');
		}
	}, [isLoading, user, router]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator color={colors.primary} />
			</View>
		);
	}

	if (view === 'login') {
		return <LoginForm />;
	}

	const openLink = () => {
		Linking.openURL('https://www.google.com');
	};

	return (
		<View style={styles.container}>
			<Image source={welcomeImage} style={styles.welcomeImage} />
			<Text style={styles.headline}>Welcome to whatsapp clone</Text>

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
			{/* <Link href='/sign-in' asChild replace> */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setView('login');
				}}
			>
				<Text style={styles.buttonText}>Agree & Continue</Text>
			</TouchableOpacity>
			{/* </Link> */}
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

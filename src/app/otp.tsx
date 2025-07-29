import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Linking,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

export default function OTP() {
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');

	const router = useRouter();

	const { signUp } = useSignUp();
	const { signIn } = useSignIn();

	const openLink = () => {
		Linking.openURL('https://www.google.com');
	};

	const sendOTP = async () => {
		setLoading(true);
		try {
			await signUp?.create({
				phoneNumber,
			});

			await signUp?.preparePhoneNumberVerification();
			router.push({
				pathname: '/verify/[phone]',
				params: { phone: phoneNumber },
			});
		} catch (err) {
			if (isClerkAPIResponseError(err)) {
				if (err.errors[0].code === 'form_identifier_exists') {
					console.log('user exists');
					await trySignin();
				} else {
					console.log({ phoneNumber });
					Alert.alert('Error', err.errors[0].message);
				}
			} else {
				console.error(err);
				Alert.alert('Error', 'An unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	};

	const trySignin = async () => {
		if (signIn) {
			const { supportedFirstFactors } = await signIn.create({
				identifier: phoneNumber,
			});

			const firstPhoneFactor = supportedFirstFactors?.find((factor) => {
				return factor.strategy === 'phone_code';
			});
			if (firstPhoneFactor) {
				const { phoneNumberId } = firstPhoneFactor;

				await signIn.prepareFirstFactor({
					strategy: 'phone_code',
					phoneNumberId,
				});

				router.push({
					pathname: '/verify/[phone]',
					params: { phone: phoneNumber, signin: 'true' },
				});
			}
		}
	};

	return (
		<SafeAreaView style={styles.root}>
			{loading && (
				<View style={[StyleSheet.absoluteFill, styles.loading]}>
					<ActivityIndicator size='large' color={colors.primary} />
					<Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
				</View>
			)}
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Text style={styles.description}>
						Whatsapp will need to verify your account. Carrier charges may
						apply.
					</Text>

					<View style={styles.list}>
						<View style={styles.listItem}>
							<Text style={styles.listItemText}>Germany</Text>
							<Ionicons name='chevron-forward' size={20} color={colors.gray} />
						</View>
						<View style={styles.separator} />

						<MaskedTextInput
							autoFocus
							value={phoneNumber}
							onChangeText={(text, _rawText) => {
								setPhoneNumber(text);
							}}
							placeholder='+49 999999999'
							keyboardType='numeric'
							mask='+99 9999999999'
							style={styles.input}
						/>
					</View>

					<Text style={styles.legal}>
						You must be{' '}
						<Text style={styles.link} onPress={openLink}>
							at least 16 years old
						</Text>{' '}
						to register. Learn how Whatsapp works with the{' '}
						<Text style={styles.link} onPress={openLink}>
							Meta companies
						</Text>
						.
					</Text>

					<View style={{ flex: 1 }} />

					<TouchableOpacity
						onPress={sendOTP}
						style={[
							styles.button,
							phoneNumber !== '' ? styles.buttonEnabled : null,
						]}
					>
						<Text
							style={[
								styles.buttonText,
								phoneNumber !== '' ? styles.buttonEnabled : null,
							]}
						>
							Next
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: colors.white,
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		gap: 20,
	},
	description: {
		fontSize: 14,
		color: colors.gray,
	},
	list: {
		backgroundColor: colors.white,
		width: '100%',
		borderRadius: 10,
		padding: 10,
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 6,
		marginBottom: 10,
	},
	listItemText: {
		fontSize: 18,
		color: colors.primary,
	},
	separator: {
		width: '100%',
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.gray,
		opacity: 0.5,
	},
	link: {
		color: colors.primary,
	},
	legal: {
		textAlign: 'center',
		fontSize: 12,
		color: '#000',
	},
	button: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: colors.lightGray,
		padding: 10,
		borderRadius: 10,
	},
	buttonEnabled: {
		backgroundColor: colors.primary,
		color: colors.white,
	},
	buttonText: {
		color: colors.gray,
		fontSize: 22,
		fontWeight: '500',
	},
	input: {
		fontSize: 18,
		color: colors.primary,
	},
	loading: {
		...StyleSheet.absoluteFillObject,
		zIndex: 10,
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

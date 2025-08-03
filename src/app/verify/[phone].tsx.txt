import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from '@clerk/clerk-expo';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	type TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { colors } from '@/theme/colors';

const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps['autoComplete']>({
	android: 'sms-otp',
	default: 'one-time-code',
});

export default function VerifyPhoneScreen() {
	const { phone, signin: signinSearchParam } = useLocalSearchParams<{
		phone: string;
		signin: string;
	}>();

	const { signUp, setActive } = useSignUp();
	const { signIn } = useSignIn();

	const [code, setCode] = useState('');
	const ref = useBlurOnFulfill({
		value: code,
		cellCount: CELL_COUNT,
	});

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	const onChangeCodeText = (code: string) => {
		setCode(code);
		if (code.length === 6) {
			if (signinSearchParam === 'true') {
				verifySignin();
			} else {
				verifyCode();
			}
		}
	};

	const verifyCode = async () => {
		try {
			await signUp?.attemptPhoneNumberVerification({
				code,
			});

			await setActive?.({
				session: signUp.createdSessionId,
			});
		} catch (err) {
			if (isClerkAPIResponseError(err)) {
				Alert.alert('Error', err.errors[0].message);
			} else {
				console.error(err);
				Alert.alert('Error', 'An unknown error occurred');
			}
		}
	};

	const verifySignin = async () => {
		if (signIn) {
			try {
				await signIn.attemptFirstFactor({
					strategy: 'phone_code',
					code,
				});

				await setActive?.({
					session: signIn.createdSessionId,
				});
			} catch (err) {
				if (isClerkAPIResponseError(err)) {
					Alert.alert('Error', err.errors[0].message);
				} else {
					console.error(err);
					Alert.alert('Error', 'An unknown error occurred');
				}
			}
		}
	};

	const resentCode = async () => {
		if (signIn && signUp) {
			try {
				if (signinSearchParam === 'true') {
					const { supportedFirstFactors } = await signIn.create({
						identifier: phone,
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
					}
				} else {
					await signUp.create({
						phoneNumber: phone,
					});
					await signUp.preparePhoneNumberVerification();
				}
			} catch (err) {
				console.error('error', JSON.stringify(err, null, 2));
				if (isClerkAPIResponseError(err)) {
					Alert.alert('Error', err.errors[0].message);
				} else {
					console.error(err);
					Alert.alert('Error', 'unknown error');
				}
			}
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: phone }} />
			<Text style={styles.legal}>
				We have sent you an SMS with a code to the number above.
			</Text>
			<Text style={styles.legal}>
				To complete your phone number verification, please enter the 6-digit
				activation code sent to your phone.
			</Text>

			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={code}
				onChangeText={onChangeCodeText}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				autoComplete={autoComplete}
				testID='my-code-input'
				renderCell={({ index, symbol, isFocused }) => (
					<View
						key={index}
						style={[styles.cellRoot, isFocused && styles.focusCell]}
						onLayout={getCellOnLayoutHandler(index)}
					>
						<Text style={styles.cellText}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					</View>
				)}
			/>

			<TouchableOpacity style={styles.button} onPress={resentCode}>
				<Text style={styles.buttonText}>
					Didn't receive a verification code?
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
		backgroundColor: colors.background,
		gap: 20,
	},
	legal: {
		textAlign: 'center',
		fontSize: 12,
		color: '#000',
	},
	button: {
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		color: colors.primary,
		fontSize: 18,
		fontWeight: '500',
	},
	codeFieldRoot: {
		marginTop: 20,
		marginLeft: 'auto',
		marginRight: 'auto',
		gap: 10,
	},
	cellRoot: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	cellText: {
		color: '#000',
		fontSize: 36,
		textAlign: 'center',
	},
	focusCell: {
		paddingBottom: 4,
		borderBottomColor: '#000',
		borderBottomWidth: 2,
	},
});

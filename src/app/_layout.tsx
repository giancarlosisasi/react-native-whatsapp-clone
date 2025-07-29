import { Stack } from "expo-router";
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="otp"
					options={{
						headerTitle: "Enter Your Phone Number",
						headerBackVisible: false,
					}}
				/>

				<Stack.Screen
					name="verify/[phone]"
					options={{
						headerTitle: "Verify Your Phone Number",
						headerBackVisible: true,
						headerBackTitle: "Edit number",
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	);
}

import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function VerifyPhoneScreen() {
	const { phone, signin } = useLocalSearchParams<{
		phone: string;
		signin: string;
	}>();

	const [code, setCode] = useState("");

	return (
		<View>
			<Text>Page</Text>
		</View>
	);
}

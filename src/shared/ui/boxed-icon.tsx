import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

type TBoxedIconProps = {
	name: keyof typeof Ionicons.glyphMap;
	backgroundColor: string;
};

export const BoxedIcon = ({ name, backgroundColor }: TBoxedIconProps) => {
	return (
		<View
			style={{
				backgroundColor,
				padding: 4,
				borderRadius: 6,
			}}
		>
			<Ionicons name={name} size={22} color='white' />
		</View>
	);
};

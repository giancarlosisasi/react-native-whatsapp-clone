import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
	type SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const THRESHOLD = 100;

function RightAction({
	prog,
	drag,
	onDelete,
}: {
	prog: SharedValue<number>;
	drag: SharedValue<number>;
	onDelete: () => void;
}) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: drag.value + THRESHOLD }],
		};
	});

	return (
		<Reanimated.View style={styleAnimation}>
			<TouchableOpacity onPress={onDelete} style={styles.rightAction}>
				<Text style={styles.rightActionText}>Delete</Text>
			</TouchableOpacity>
		</Reanimated.View>
	);
}

export default function SwipableRow({
	children,
	onDelete,
}: {
	children: React.ReactNode;
	onDelete: () => void;
}) {
	return (
		<ReanimatedSwipeable
			containerStyle={styles.swipeable}
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={THRESHOLD}
			renderRightActions={(prog, drag) => (
				<RightAction prog={prog} drag={drag} onDelete={onDelete} />
			)}
		>
			{children}
		</ReanimatedSwipeable>
	);
}

const styles = StyleSheet.create({
	rightAction: {
		width: THRESHOLD,
		height: '100%',
		backgroundColor: colors.red,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightActionText: {
		color: colors.white,
	},
	swipeable: {},
});

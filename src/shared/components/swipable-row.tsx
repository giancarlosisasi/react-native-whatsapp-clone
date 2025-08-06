import { StyleSheet } from 'react-native';
import ReanimatedSwipeable, {
	type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SharedValue } from 'react-native-reanimated';

export default function SwipableRow({
	children,
	rightAction,
	rightThreshold,
	leftThreshold,
}: {
	children: React.ReactNode;
	rightAction: (
		prog: SharedValue<number>,
		drag: SharedValue<number>,
		swipeableMethods: SwipeableMethods,
	) => React.ReactNode;
	rightThreshold?: number;
	leftThreshold?: number;
}) {
	return (
		<ReanimatedSwipeable
			containerStyle={styles.swipeable}
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={rightThreshold}
			leftThreshold={leftThreshold}
			renderRightActions={rightAction}
		>
			{children}
		</ReanimatedSwipeable>
	);
}

const styles = StyleSheet.create({
	swipeable: {},
});

import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import {
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import ReanimatedSwipeable, {
	type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
	type SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { View } from '@/shared/ui/base';
import { colors } from '@/theme/colors';
import SwipableRow from './swipable-row';

const THRESHOLD = 100;

type TChatRowProps = {
	id: string;
	from: string;
	date: string;
	img: string;
	msg: string;
	read: boolean;
	unreadCount: number;
};

function RightAction({
	prog,
	drag,
	onMore,
	onArchive,
}: {
	prog: SharedValue<number>;
	drag: SharedValue<number>;
	onMore: () => void;
	onArchive: () => void;
}) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: drag.value + 200 }],
		};
	});
	const styleAnimationArchive = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: drag.value + 200 }],
		};
	});

	return (
		<View style={{ flexDirection: 'row' }}>
			<Reanimated.View style={styleAnimation}>
				<TouchableOpacity onPress={onMore} style={styles.rightAction}>
					<Ionicons name='ellipsis-horizontal' size={24} color={colors.white} />
					<Text style={styles.rightActionText}>More</Text>
				</TouchableOpacity>
			</Reanimated.View>

			<Reanimated.View style={styleAnimationArchive}>
				<TouchableOpacity onPress={onArchive} style={styles.rightActionArchive}>
					<Ionicons name='archive' size={24} color={colors.white} />
					<Text style={styles.rightActionText}>Archive</Text>
				</TouchableOpacity>
			</Reanimated.View>
		</View>
	);
}

export const ChatRow = ({
	id,
	from,
	date,
	img,
	msg,
	read,
	unreadCount,
}: TChatRowProps) => {
	return (
		<SwipableRow
			rightAction={(prog, drag) => (
				<RightAction
					prog={prog}
					drag={drag}
					onMore={() => {}}
					onArchive={() => {}}
				/>
			)}
			rightThreshold={50}
		>
			<Link href='/(tabs)/calls' asChild>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor={colors.lightGray}
					style={{ flex: 1 }}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 8,
							paddingLeft: 20,
							paddingVertical: 10,
						}}
					>
						<Image
							source={{ uri: img }}
							style={{ width: 50, height: 50, borderRadius: 50 }}
						/>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: 'bold',
								}}
							>
								{from}
							</Text>
							<Text style={{ color: colors.gray, fontSize: 16 }}>
								{msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
							</Text>
						</View>
						<Text
							style={{
								color: colors.gray,
								paddingRight: 20,
								alignSelf: 'flex-start',
							}}
						>
							{format(date, 'MM.dd.yy')}
						</Text>
					</View>
				</TouchableHighlight>
			</Link>
		</SwipableRow>
	);
};

const styles = StyleSheet.create({
	rightAction: {
		width: 100,
		height: '100%',
		backgroundColor: colors.darkGray,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightActionArchive: {
		width: 100,
		height: '100%',
		backgroundColor: colors.info,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightActionText: {
		color: colors.white,
	},
	swipeable: {},
});

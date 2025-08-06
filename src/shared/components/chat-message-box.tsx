import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import ReanimatedSwipeable, {
	type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import {
	type IMessage,
	Message,
	type MessageProps,
} from 'react-native-gifted-chat';
import { isSameDay, isSameUser } from 'react-native-gifted-chat/lib/utils';
import Reanimated, {
	type SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';

type ChatMessageBoxProps = {
	setReplyOnSwipeOpen: (message: IMessage) => void;
} & MessageProps<IMessage>;

const RightAction = ({
	progress,
	translation,
	swipeableMethods,
	isNextMyMessage,
	position,
}: {
	progress: SharedValue<number>;
	translation: SharedValue<number>;
	swipeableMethods: SwipeableMethods;
	isNextMyMessage: boolean;
	position: 'left' | 'right';
}) => {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translation.value - 30 },
				// scale a maximum of 1
				{ scale: Math.min(progress.value, 1) },
			],
		};
	});

	return (
		<Reanimated.View
			style={[
				styles.container,
				styleAnimation,
				// { transform: [{ scale: size }, { translateX: trans }] },
				isNextMyMessage ? styles.defaultBottomOffset : styles.bottomOffsetNext,
				position === 'right' && styles.leftOffsetValue,
			]}
		>
			<View style={styles.replyImageWrapper}>
				<MaterialCommunityIcons
					name='reply-circle'
					size={26}
					color={colors.gray}
				/>
			</View>
		</Reanimated.View>
	);
};

export const ChatMessageBox = ({
	setReplyOnSwipeOpen,
	...props
}: ChatMessageBoxProps) => {
	const swipeableMethodsRef = useRef<SwipeableMethods | null>(null);
	const isNextMyMessage =
		props.currentMessage &&
		props.nextMessage &&
		isSameUser(props.currentMessage, props.nextMessage) &&
		isSameDay(props.currentMessage, props.nextMessage);

	const onSwipeOpenAction = () => {
		if (props.currentMessage) {
			setReplyOnSwipeOpen({ ...props.currentMessage });
			swipeableMethodsRef.current?.close();
		}
	};

	return (
		<ReanimatedSwipeable
			ref={swipeableMethodsRef}
			friction={2}
			rightThreshold={40}
			onSwipeableWillOpen={onSwipeOpenAction}
			renderLeftActions={(progress, translation, swipeableMethods) => (
				<RightAction
					progress={progress}
					translation={translation}
					swipeableMethods={swipeableMethods}
					isNextMyMessage={isNextMyMessage ?? false}
					position={props.position}
				/>
			)}
		>
			<Message {...props} />
		</ReanimatedSwipeable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 40,
	},
	replyImageWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	replyImage: {
		width: 20,
		height: 20,
	},
	defaultBottomOffset: {
		marginBottom: 2,
	},
	bottomOffsetNext: {
		marginBottom: 10,
	},
	leftOffsetValue: {
		marginLeft: 16,
	},
});

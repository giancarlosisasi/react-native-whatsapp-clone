import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground } from 'expo-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
	Bubble,
	GiftedChat,
	type IMessage,
	InputToolbar,
	Send,
	SystemMessage,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatMessageBox } from '@/shared/components/chat-message-box';
import { ReplyMessageBar } from '@/shared/components/reply-message-bar';
import { colors } from '@/theme/colors';
import messagesData from '../../../../assets/data/messages.json';

export default function Chat() {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const insets = useSafeAreaInsets();
	const [text, setText] = useState('');

	const [replyMessage, setReplyMessage] = useState<IMessage | undefined>(
		undefined,
	);

	useEffect(() => {
		setMessages([
			...messagesData.map((message) => ({
				_id: message.id,
				text: message.msg,
				createdAt: new Date(message.date),
				user: {
					_id: message.from,
					name: message.from ? 'You' : 'Bob',
				},
			})),
			{
				_id: 0,
				system: true,
				text: 'All your base are belong to use',
				createdAt: new Date(),
				user: {
					_id: 0,
					name: 'Bot',
				},
			},
		]);
	}, []);

	const onSend = useCallback((messages: IMessage[]) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages),
		);
	}, []);

	const onReplySwipeOpen = useCallback((message: IMessage) => {
		setReplyMessage(message);
	}, []);

	return (
		<ImageBackground
			source={require('../../../../assets/images/pattern.png')}
			style={{
				flex: 1,
				marginBottom: insets.bottom,
				backgroundColor: colors.background,
			}}
		>
			<GiftedChat
				messages={messages}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: 1,
				}}
				renderAvatar={null}
				onInputTextChanged={(text) => setText(text)}
				bottomOffset={insets.bottom}
				maxComposerHeight={100}
				renderSystemMessage={(props) => {
					return (
						<SystemMessage
							{...props}
							textStyle={{
								color: colors.gray,
							}}
						/>
					);
				}}
				renderBubble={(props) => {
					return (
						<Bubble
							{...props}
							textStyle={{
								right: {
									color: colors.black,
								},
							}}
							wrapperStyle={{
								left: {
									backgroundColor: colors.white,
								},
								right: {
									backgroundColor: colors.green,
								},
							}}
						/>
					);
				}}
				renderSend={(props) => (
					<View
						style={{
							flexDirection: 'row',
							height: 44,
							alignItems: 'center',
							justifyContent: 'center',
							gap: 14,
							paddingHorizontal: 14,
						}}
					>
						{text.length > 0 ? (
							<Send
								{...props}
								containerStyle={{
									justifyContent: 'center',
								}}
							>
								<Ionicons name='send' color={colors.primary} size={28} />
							</Send>
						) : null}

						{text.length === 0 ? (
							<>
								<Ionicons
									name='camera-outline'
									color={colors.primary}
									size={28}
								/>
								<Ionicons name='mic-outline' color={colors.primary} size={28} />
							</>
						) : null}
					</View>
				)}
				textInputProps={styles.composer}
				renderInputToolbar={(props) => (
					<InputToolbar
						{...props}
						containerStyle={{
							backgroundColor: colors.background,
						}}
						renderActions={() => (
							<View
								style={{
									height: 44,
									justifyContent: 'center',
									alignItems: 'center',
									marginLeft: 8,
								}}
							>
								<Ionicons name='add' color={colors.primary} size={28} />
							</View>
						)}
					/>
				)}
				renderMessage={(props) => {
					return (
						<ChatMessageBox
							{...props}
							setReplyOnSwipeOpen={onReplySwipeOpen}
							currentMessageOnReply={replyMessage}
						/>
					);
				}}
				renderChatFooter={() => (
					<ReplyMessageBar
						clearReply={() => {
							setReplyMessage(undefined);
						}}
						message={replyMessage}
					/>
				)}
			/>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	composer: {
		backgroundColor: colors.background,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.gray,
		paddingHorizontal: 16,
		fontSize: 16,
		marginTop: 8,
		paddingTop: 8,
	},
});

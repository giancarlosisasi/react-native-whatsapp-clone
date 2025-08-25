import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground } from 'expo-image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	Bubble,
	GiftedChat,
	type IMessage,
	InputToolbar,
	Send,
	SystemMessage,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	type PreloadedQuery,
	useMutation,
	usePreloadedQuery,
	useSubscription,
} from 'react-relay';
import { graphql } from 'relay-runtime';
import { ChatMessageBox } from '@/shared/components/chat-message-box';
import { ReplyMessageBar } from '@/shared/components/reply-message-bar';
import { useAuth } from '@/shared/context/auth';
import { colors } from '@/theme/colors';
import type { chatDetailConversationMessagesQuery as QueryType } from './__generated__/chatDetailConversationMessagesQuery.graphql';
import type { chatDetailMessageAddedSubscription as SubscriptionType } from './__generated__/chatDetailMessageAddedSubscription.graphql';
import type { chatDetailSendMessageMutation as MutationType } from './__generated__/chatDetailSendMessageMutation.graphql';

export const chatDetailConversationMessagesQuery = graphql`
query chatDetailConversationMessagesQuery($input: ConversationMessageInput!) {
  conversationMessages(input: $input) {
    ... on ConversationMessagesQuerySuccess {
      success
      messages {
        id
        sender {
          id
          name
          email
          avatarUrl
          createdAt
          updatedAt
        }
        content
        messageType
        status
        replyToMessage {
          id
          senderName
          content
          messageType
        }
        createdAt
        editedAt
        deliveredAt
        readAt
      }
      __typename
    }
    ... on ServerError {
      errorMessage
      code
      __typename
    }
    ... on UnauthorizedError {
      errorMessage
      code
      __typename
    }
    ... on NotFoundError {
      errorMessage
      code
      __typename
    }
  }
}
`;

const chatDetailSendMessageMutation = graphql`
  mutation chatDetailSendMessageMutation($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ... on SendMessageSuccess {
        success
        __typename
      }
      ... on ServerError {
        errorMessage
        code
        __typename
      }
      ... on UnauthorizedError {
        errorMessage
        code
        __typename
      }
      ... on NotFoundError {
        errorMessage
        code
        __typename
      }
    }
  }
`;

const subscriptionMessageAdded = graphql`
  subscription chatDetailMessageAddedSubscription($input: MessageAddedSubscriptionInput!) {
    messageAdded(input: $input) {
      id
      senderUserId
      content
      replyToMessageId
      messageType
    }
  }
`;

export function ChatDetail({
	queryRef,
	conversationId,
}: {
	queryRef: PreloadedQuery<QueryType>;
	conversationId: string;
}) {
	const { user } = useAuth();
	const insets = useSafeAreaInsets();
	const [text, setText] = useState('');

	const [replyMessage, setReplyMessage] = useState<IMessage | undefined>(
		undefined,
	);

	const [sendMessage, isInFlight] = useMutation<MutationType>(
		chatDetailSendMessageMutation,
	);

	const data = usePreloadedQuery<QueryType>(
		chatDetailConversationMessagesQuery,
		queryRef,
	);

	const config = useMemo(
		() => ({
			variables: {
				input: {
					conversationId,
				},
			},
			subscription: subscriptionMessageAdded,
		}),
		[conversationId],
	);

	useSubscription<SubscriptionType>(config);

	const messages: IMessage[] =
		data.conversationMessages.__typename === 'ConversationMessagesQuerySuccess'
			? data.conversationMessages.messages.map((message) => ({
					_id: message.id,
					text: message.content,
					createdAt: new Date(message.createdAt),
					user: {
						_id: message.sender.id,
						name: message.sender.name || message.sender.email || 'Unknown',
					},
				}))
			: [];

	// useEffect(() => {
	// 	setMessages([
	// 		...messagesData.map((message) => ({
	// 			_id: message.id,
	// 			text: message.msg,
	// 			createdAt: new Date(message.date),
	// 			user: {
	// 				_id: message.from,
	// 				name: message.from ? 'You' : 'Bob',
	// 			},
	// 		})),
	// 		{
	// 			_id: 0,
	// 			system: true,
	// 			text: 'All your base are belong to use',
	// 			createdAt: new Date(),
	// 			user: {
	// 				_id: 0,
	// 				name: 'Bot',
	// 			},
	// 		},
	// 	]);
	// }, []);

	const onSend = (messages: IMessage[]) => {
		const newMessage = messages[0];
		sendMessage({
			variables: {
				input: {
					content: newMessage.text,
					conversationId,
					messageType: 'TEXT',
					replyToMessageId: null,
					senderID: user?.id || '',
				},
			},
		});
	};

	const onReplySwipeOpen = useCallback((message: IMessage) => {
		setReplyMessage(message);
	}, []);

	return (
		<ImageBackground
			source={require('../../../assets/images/pattern.png')}
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
					_id: user?.id || '',
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
						<ChatMessageBox {...props} setReplyOnSwipeOpen={onReplySwipeOpen} />
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

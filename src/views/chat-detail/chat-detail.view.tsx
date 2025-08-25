import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';
import type { chatDetailConversationMessagesQuery as QueryType } from './__generated__/chatDetailConversationMessagesQuery.graphql';
import { ChatDetail, chatDetailConversationMessagesQuery } from './chat-detail';
import { SuspenseChatDetailView } from './suspense';

export const ChatDetailView = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const [conversationMessagesQueryRef, loadConversationMessagesQuery] =
		useQueryLoader<QueryType>(chatDetailConversationMessagesQuery);

	useEffect(() => {
		loadConversationMessagesQuery({
			input: {
				conversationId: id,
				pagination: {
					limit: 10,
					offset: 0,
				},
			},
		});
	}, [loadConversationMessagesQuery, id]);

	if (!conversationMessagesQueryRef) {
		return <FullScreenActivityIndicator />;
	}

	return (
		<SuspenseChatDetailView>
			<ChatDetail queryRef={conversationMessagesQueryRef} conversationId={id} />
		</SuspenseChatDetailView>
	);
};

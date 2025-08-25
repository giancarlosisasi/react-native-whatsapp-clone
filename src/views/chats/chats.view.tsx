import { useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';
import type { chatsMyConversationsQuery as QueryType } from './__generated__/chatsMyConversationsQuery.graphql';
import { Chats, ChatsMyConversationsQuery } from './chats';
import { SuspenseChatsView } from './suspense';

export const ChatsView = () => {
	const [myConversationsQueryRef, loadMyConversationsQuery] =
		useQueryLoader<QueryType>(ChatsMyConversationsQuery);

	useEffect(() => {
		loadMyConversationsQuery({});
	}, [loadMyConversationsQuery]);

	if (!myConversationsQueryRef) {
		return <FullScreenActivityIndicator />;
	}

	return (
		<SuspenseChatsView>
			<Chats queryRef={myConversationsQueryRef} />
		</SuspenseChatsView>
	);
};

import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { type PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import { ChatRow } from '@/shared/components/chat-row';
import { defaultStyles } from '@/shared/ui/default-styles';
import { colors } from '@/theme/colors';
import type { chatsMyConversationsQuery as QueryType } from './__generated__/chatsMyConversationsQuery.graphql';

export const ChatsMyConversationsQuery = graphql`
  query chatsMyConversationsQuery {
  myConversations {
    ... on MyConversationsQuerySuccess {
      success
      conversations {
        ... on ConversationListItemDirect {
          id
          type
          lastMessage {
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
          unreadCount
          createdAt
          updatedAt
          __typename
        }
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
  }
}
`;

export function Chats({ queryRef }: { queryRef: PreloadedQuery<QueryType> }) {
	const data = usePreloadedQuery(ChatsMyConversationsQuery, queryRef);

	const chatList: Array<{
		id: string;
		from: string;
		date: string;
		img: string;
		msg: string;
		read: boolean;
		unreadCount: number;
	}> =
		data.myConversations.__typename === 'MyConversationsQuerySuccess'
			? data.myConversations.conversations
					.filter(
						(conversation) =>
							conversation.__typename === 'ConversationListItemDirect',
					)
					.map((conversation) => ({
						id: conversation.id,
						from:
							conversation.lastMessage?.sender.name ||
							conversation.lastMessage?.sender.email ||
							'unknown',
						date: conversation.lastMessage?.createdAt,
						img:
							conversation.lastMessage?.sender.avatarUrl ||
							'https://avatar.iran.liara.run/public',
						msg: conversation.lastMessage?.content || 'no message',
						read: false,
						unreadCount: 0,
					}))
			: [];

	return (
		<ScrollView
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={{
				paddingBottom: 40,
				paddingTop: 120,
				backgroundColor: colors.white,
			}}
		>
			<FlatList
				scrollEnabled={false}
				data={chatList}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
				renderItem={({ item }) => <ChatRow {...item} />}
			/>
		</ScrollView>
	);
}

// const styles = StyleSheet.create({});

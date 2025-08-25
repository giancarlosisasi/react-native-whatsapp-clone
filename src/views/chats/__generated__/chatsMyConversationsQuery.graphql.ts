/**
 * @generated SignedSource<<984df63221fcd95bffc37c99a6bb4c3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ConversationTypeEnum = 'DIRECT' | 'GROUP' | '%future added value';
export type MessageStatusEnum =
	| 'DELIVERED'
	| 'FAILED'
	| 'READ'
	| 'SENT'
	| '%future added value';
export type MessageTypeEnum = 'FILE' | 'IMAGE' | 'TEXT' | '%future added value';
export type chatsMyConversationsQuery$variables = Record<PropertyKey, never>;
export type chatsMyConversationsQuery$data = {
	readonly myConversations:
		| {
				readonly __typename: 'MyConversationsQuerySuccess';
				readonly conversations: ReadonlyArray<
					| {
							readonly __typename: 'ConversationListItemDirect';
							readonly createdAt: any;
							readonly id: string;
							readonly lastMessage:
								| {
										readonly content: string;
										readonly createdAt: any;
										readonly deliveredAt: any | null | undefined;
										readonly editedAt: any | null | undefined;
										readonly id: string;
										readonly messageType: MessageTypeEnum;
										readonly readAt: any | null | undefined;
										readonly replyToMessage:
											| {
													readonly content: string;
													readonly id: string;
													readonly messageType: MessageTypeEnum;
													readonly senderName: string;
											  }
											| null
											| undefined;
										readonly sender: {
											readonly avatarUrl: string | null | undefined;
											readonly createdAt: any;
											readonly email: string;
											readonly id: string;
											readonly name: string | null | undefined;
											readonly updatedAt: any;
										};
										readonly status: MessageStatusEnum;
								  }
								| null
								| undefined;
							readonly type: ConversationTypeEnum;
							readonly unreadCount: number;
							readonly updatedAt: any;
					  }
					| {
							// This will never be '%other', but we need some
							// value in case none of the concrete values match.
							readonly __typename: '%other';
					  }
				>;
				readonly success: boolean;
		  }
		| {
				readonly __typename: 'ServerError';
				readonly code: string;
				readonly errorMessage: string;
		  }
		| {
				readonly __typename: 'UnauthorizedError';
				readonly code: string;
				readonly errorMessage: string;
		  }
		| {
				// This will never be '%other', but we need some
				// value in case none of the concrete values match.
				readonly __typename: '%other';
		  };
};
export type chatsMyConversationsQuery = {
	response: chatsMyConversationsQuery$data;
	variables: chatsMyConversationsQuery$variables;
};

const node: ConcreteRequest = (function () {
	var v0 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'success',
			storageKey: null,
		},
		v1 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'id',
			storageKey: null,
		},
		v2 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'type',
			storageKey: null,
		},
		v3 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'createdAt',
			storageKey: null,
		},
		v4 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'updatedAt',
			storageKey: null,
		},
		v5 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'content',
			storageKey: null,
		},
		v6 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'messageType',
			storageKey: null,
		},
		v7 = {
			alias: null,
			args: null,
			concreteType: 'Message',
			kind: 'LinkedField',
			name: 'lastMessage',
			plural: false,
			selections: [
				v1 /*: any*/,
				{
					alias: null,
					args: null,
					concreteType: 'User',
					kind: 'LinkedField',
					name: 'sender',
					plural: false,
					selections: [
						v1 /*: any*/,
						{
							alias: null,
							args: null,
							kind: 'ScalarField',
							name: 'name',
							storageKey: null,
						},
						{
							alias: null,
							args: null,
							kind: 'ScalarField',
							name: 'email',
							storageKey: null,
						},
						{
							alias: null,
							args: null,
							kind: 'ScalarField',
							name: 'avatarUrl',
							storageKey: null,
						},
						v3 /*: any*/,
						v4 /*: any*/,
					],
					storageKey: null,
				},
				v5 /*: any*/,
				v6 /*: any*/,
				{
					alias: null,
					args: null,
					kind: 'ScalarField',
					name: 'status',
					storageKey: null,
				},
				{
					alias: null,
					args: null,
					concreteType: 'ReplyMessage',
					kind: 'LinkedField',
					name: 'replyToMessage',
					plural: false,
					selections: [
						v1 /*: any*/,
						{
							alias: null,
							args: null,
							kind: 'ScalarField',
							name: 'senderName',
							storageKey: null,
						},
						v5 /*: any*/,
						v6 /*: any*/,
					],
					storageKey: null,
				},
				v3 /*: any*/,
				{
					alias: null,
					args: null,
					kind: 'ScalarField',
					name: 'editedAt',
					storageKey: null,
				},
				{
					alias: null,
					args: null,
					kind: 'ScalarField',
					name: 'deliveredAt',
					storageKey: null,
				},
				{
					alias: null,
					args: null,
					kind: 'ScalarField',
					name: 'readAt',
					storageKey: null,
				},
			],
			storageKey: null,
		},
		v8 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'unreadCount',
			storageKey: null,
		},
		v9 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: '__typename',
			storageKey: null,
		},
		v10 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'errorMessage',
			storageKey: null,
		},
		v11 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'code',
			storageKey: null,
		},
		v12 = [v10 /*: any*/, v11 /*: any*/, v9 /*: any*/],
		v13 = [v10 /*: any*/, v11 /*: any*/];
	return {
		fragment: {
			argumentDefinitions: [],
			kind: 'Fragment',
			metadata: null,
			name: 'chatsMyConversationsQuery',
			selections: [
				{
					alias: null,
					args: null,
					concreteType: null,
					kind: 'LinkedField',
					name: 'myConversations',
					plural: false,
					selections: [
						{
							kind: 'InlineFragment',
							selections: [
								v0 /*: any*/,
								{
									alias: null,
									args: null,
									concreteType: null,
									kind: 'LinkedField',
									name: 'conversations',
									plural: true,
									selections: [
										{
											kind: 'InlineFragment',
											selections: [
												v1 /*: any*/,
												v2 /*: any*/,
												v7 /*: any*/,
												v8 /*: any*/,
												v3 /*: any*/,
												v4 /*: any*/,
												v9 /*: any*/,
											],
											type: 'ConversationListItemDirect',
											abstractKey: null,
										},
									],
									storageKey: null,
								},
								v9 /*: any*/,
							],
							type: 'MyConversationsQuerySuccess',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v12 /*: any*/,
							type: 'ServerError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v12 /*: any*/,
							type: 'UnauthorizedError',
							abstractKey: null,
						},
					],
					storageKey: null,
				},
			],
			type: 'Query',
			abstractKey: null,
		},
		kind: 'Request',
		operation: {
			argumentDefinitions: [],
			kind: 'Operation',
			name: 'chatsMyConversationsQuery',
			selections: [
				{
					alias: null,
					args: null,
					concreteType: null,
					kind: 'LinkedField',
					name: 'myConversations',
					plural: false,
					selections: [
						v9 /*: any*/,
						{
							kind: 'InlineFragment',
							selections: [
								v0 /*: any*/,
								{
									alias: null,
									args: null,
									concreteType: null,
									kind: 'LinkedField',
									name: 'conversations',
									plural: true,
									selections: [
										v9 /*: any*/,
										{
											kind: 'InlineFragment',
											selections: [
												v1 /*: any*/,
												v2 /*: any*/,
												v7 /*: any*/,
												v8 /*: any*/,
												v3 /*: any*/,
												v4 /*: any*/,
											],
											type: 'ConversationListItemDirect',
											abstractKey: null,
										},
										{
											kind: 'InlineFragment',
											selections: [v1 /*: any*/],
											type: 'ConversationListItemGroup',
											abstractKey: null,
										},
									],
									storageKey: null,
								},
							],
							type: 'MyConversationsQuerySuccess',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v13 /*: any*/,
							type: 'ServerError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v13 /*: any*/,
							type: 'UnauthorizedError',
							abstractKey: null,
						},
					],
					storageKey: null,
				},
			],
		},
		params: {
			cacheID: '154ac1c9cbd08053c030347449b20b84',
			id: null,
			metadata: {},
			name: 'chatsMyConversationsQuery',
			operationKind: 'query',
			text: 'query chatsMyConversationsQuery {\n  myConversations {\n    __typename\n    ... on MyConversationsQuerySuccess {\n      success\n      conversations {\n        __typename\n        ... on ConversationListItemDirect {\n          id\n          type\n          lastMessage {\n            id\n            sender {\n              id\n              name\n              email\n              avatarUrl\n              createdAt\n              updatedAt\n            }\n            content\n            messageType\n            status\n            replyToMessage {\n              id\n              senderName\n              content\n              messageType\n            }\n            createdAt\n            editedAt\n            deliveredAt\n            readAt\n          }\n          unreadCount\n          createdAt\n          updatedAt\n          __typename\n        }\n        ... on ConversationListItemGroup {\n          id\n        }\n      }\n      __typename\n    }\n    ... on ServerError {\n      errorMessage\n      code\n      __typename\n    }\n    ... on UnauthorizedError {\n      errorMessage\n      code\n      __typename\n    }\n  }\n}\n',
		},
	};
})();

(node as any).hash = '2da4b1c3fc566368435b17d41412a78a';

export default node;

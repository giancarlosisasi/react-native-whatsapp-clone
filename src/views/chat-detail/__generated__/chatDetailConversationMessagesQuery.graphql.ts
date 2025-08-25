/**
 * @generated SignedSource<<c4c02c73cd3878b400e11ecb8c6e28f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MessageStatusEnum =
	| 'DELIVERED'
	| 'FAILED'
	| 'READ'
	| 'SENT'
	| '%future added value';
export type MessageTypeEnum = 'FILE' | 'IMAGE' | 'TEXT' | '%future added value';
export type ConversationMessageInput = {
	conversationId: string;
	pagination?: Pagination | null | undefined;
};
export type Pagination = {
	limit: number;
	offset: number;
};
export type chatDetailConversationMessagesQuery$variables = {
	input: ConversationMessageInput;
};
export type chatDetailConversationMessagesQuery$data = {
	readonly conversationMessages:
		| {
				readonly __typename: 'ConversationMessagesQuerySuccess';
				readonly messages: ReadonlyArray<{
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
				}>;
				readonly success: boolean;
		  }
		| {
				readonly __typename: 'NotFoundError';
				readonly code: string;
				readonly errorMessage: string;
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
export type chatDetailConversationMessagesQuery = {
	response: chatDetailConversationMessagesQuery$data;
	variables: chatDetailConversationMessagesQuery$variables;
};

const node: ConcreteRequest = (function () {
	var v0 = [
			{
				defaultValue: null,
				kind: 'LocalArgument',
				name: 'input',
			},
		],
		v1 = [
			{
				kind: 'Variable',
				name: 'input',
				variableName: 'input',
			},
		],
		v2 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'success',
			storageKey: null,
		},
		v3 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'id',
			storageKey: null,
		},
		v4 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'createdAt',
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
			name: 'messages',
			plural: true,
			selections: [
				v3 /*: any*/,
				{
					alias: null,
					args: null,
					concreteType: 'User',
					kind: 'LinkedField',
					name: 'sender',
					plural: false,
					selections: [
						v3 /*: any*/,
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
						v4 /*: any*/,
						{
							alias: null,
							args: null,
							kind: 'ScalarField',
							name: 'updatedAt',
							storageKey: null,
						},
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
						v3 /*: any*/,
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
				v4 /*: any*/,
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
			name: '__typename',
			storageKey: null,
		},
		v9 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'errorMessage',
			storageKey: null,
		},
		v10 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'code',
			storageKey: null,
		},
		v11 = [v9 /*: any*/, v10 /*: any*/, v8 /*: any*/],
		v12 = [v9 /*: any*/, v10 /*: any*/];
	return {
		fragment: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Fragment',
			metadata: null,
			name: 'chatDetailConversationMessagesQuery',
			selections: [
				{
					alias: null,
					args: v1 /*: any*/,
					concreteType: null,
					kind: 'LinkedField',
					name: 'conversationMessages',
					plural: false,
					selections: [
						{
							kind: 'InlineFragment',
							selections: [v2 /*: any*/, v7 /*: any*/, v8 /*: any*/],
							type: 'ConversationMessagesQuerySuccess',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v11 /*: any*/,
							type: 'ServerError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v11 /*: any*/,
							type: 'UnauthorizedError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v11 /*: any*/,
							type: 'NotFoundError',
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
			argumentDefinitions: v0 /*: any*/,
			kind: 'Operation',
			name: 'chatDetailConversationMessagesQuery',
			selections: [
				{
					alias: null,
					args: v1 /*: any*/,
					concreteType: null,
					kind: 'LinkedField',
					name: 'conversationMessages',
					plural: false,
					selections: [
						v8 /*: any*/,
						{
							kind: 'InlineFragment',
							selections: [v2 /*: any*/, v7 /*: any*/],
							type: 'ConversationMessagesQuerySuccess',
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
						{
							kind: 'InlineFragment',
							selections: v12 /*: any*/,
							type: 'NotFoundError',
							abstractKey: null,
						},
					],
					storageKey: null,
				},
			],
		},
		params: {
			cacheID: '61e4c34f1878c88dfc21fe9ebcf29ebd',
			id: null,
			metadata: {},
			name: 'chatDetailConversationMessagesQuery',
			operationKind: 'query',
			text: 'query chatDetailConversationMessagesQuery(\n  $input: ConversationMessageInput!\n) {\n  conversationMessages(input: $input) {\n    __typename\n    ... on ConversationMessagesQuerySuccess {\n      success\n      messages {\n        id\n        sender {\n          id\n          name\n          email\n          avatarUrl\n          createdAt\n          updatedAt\n        }\n        content\n        messageType\n        status\n        replyToMessage {\n          id\n          senderName\n          content\n          messageType\n        }\n        createdAt\n        editedAt\n        deliveredAt\n        readAt\n      }\n      __typename\n    }\n    ... on ServerError {\n      errorMessage\n      code\n      __typename\n    }\n    ... on UnauthorizedError {\n      errorMessage\n      code\n      __typename\n    }\n    ... on NotFoundError {\n      errorMessage\n      code\n      __typename\n    }\n  }\n}\n',
		},
	};
})();

(node as any).hash = 'e6b22662791e878043aff11492ac36a9';

export default node;

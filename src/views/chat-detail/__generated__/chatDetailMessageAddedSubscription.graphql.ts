/**
 * @generated SignedSource<<7bf93a55d48e5dd58b37cbc8eb8a25e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MessageTypeEnum = 'FILE' | 'IMAGE' | 'TEXT' | '%future added value';
export type MessageAddedSubscriptionInput = {
	conversationId: string;
};
export type chatDetailMessageAddedSubscription$variables = {
	input: MessageAddedSubscriptionInput;
};
export type chatDetailMessageAddedSubscription$data = {
	readonly messageAdded: {
		readonly content: string;
		readonly id: string;
		readonly messageType: MessageTypeEnum;
		readonly replyToMessageId: string | null | undefined;
		readonly senderUserId: string;
	};
};
export type chatDetailMessageAddedSubscription = {
	response: chatDetailMessageAddedSubscription$data;
	variables: chatDetailMessageAddedSubscription$variables;
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
				alias: null,
				args: [
					{
						kind: 'Variable',
						name: 'input',
						variableName: 'input',
					},
				],
				concreteType: 'MessageAddedEvent',
				kind: 'LinkedField',
				name: 'messageAdded',
				plural: false,
				selections: [
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'id',
						storageKey: null,
					},
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'senderUserId',
						storageKey: null,
					},
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'content',
						storageKey: null,
					},
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'replyToMessageId',
						storageKey: null,
					},
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'messageType',
						storageKey: null,
					},
				],
				storageKey: null,
			},
		];
	return {
		fragment: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Fragment',
			metadata: null,
			name: 'chatDetailMessageAddedSubscription',
			selections: v1 /*: any*/,
			type: 'Subscription',
			abstractKey: null,
		},
		kind: 'Request',
		operation: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Operation',
			name: 'chatDetailMessageAddedSubscription',
			selections: v1 /*: any*/,
		},
		params: {
			cacheID: '6461a5bca01d99e6d2f3060f12c4c80d',
			id: null,
			metadata: {},
			name: 'chatDetailMessageAddedSubscription',
			operationKind: 'subscription',
			text: 'subscription chatDetailMessageAddedSubscription(\n  $input: MessageAddedSubscriptionInput!\n) {\n  messageAdded(input: $input) {\n    id\n    senderUserId\n    content\n    replyToMessageId\n    messageType\n  }\n}\n',
		},
	};
})();

(node as any).hash = 'b1e19fcc09e3b7c3963f0d11a4461202';

export default node;

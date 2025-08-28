/**
 * @generated SignedSource<<7c0117e46b72776d7be0ac3aaeafac66>>
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
		readonly createdAt: any;
		readonly id: string;
		readonly messageType: MessageTypeEnum;
		readonly replyToMessageId: string | null | undefined;
		readonly senderName: string;
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
						name: 'senderName',
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
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'createdAt',
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
			cacheID: 'ef7180fea5856eab6e4eaf319eeccea1',
			id: null,
			metadata: {},
			name: 'chatDetailMessageAddedSubscription',
			operationKind: 'subscription',
			text: 'subscription chatDetailMessageAddedSubscription(\n  $input: MessageAddedSubscriptionInput!\n) {\n  messageAdded(input: $input) {\n    id\n    senderUserId\n    senderName\n    content\n    replyToMessageId\n    messageType\n    createdAt\n  }\n}\n',
		},
	};
})();

(node as any).hash = 'd8fbdf42e6b0e8b7cb16a2a4a902fcf7';

export default node;

/**
 * @generated SignedSource<<bcd114627403ec4ff39da3baa227f14c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MessageTypeEnum = 'FILE' | 'IMAGE' | 'TEXT' | '%future added value';
export type SendMessageInput = {
	content: string;
	conversationId: string;
	messageType: MessageTypeEnum;
	replyToMessageId?: string | null | undefined;
	senderID: string;
};
export type chatDetailSendMessageMutation$variables = {
	input: SendMessageInput;
};
export type chatDetailSendMessageMutation$data = {
	readonly sendMessage:
		| {
				readonly __typename: 'NotFoundError';
				readonly code: string;
				readonly errorMessage: string;
		  }
		| {
				readonly __typename: 'SendMessageSuccess';
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
export type chatDetailSendMessageMutation = {
	response: chatDetailSendMessageMutation$data;
	variables: chatDetailSendMessageMutation$variables;
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
			name: '__typename',
			storageKey: null,
		},
		v4 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'errorMessage',
			storageKey: null,
		},
		v5 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'code',
			storageKey: null,
		},
		v6 = [v4 /*: any*/, v5 /*: any*/, v3 /*: any*/],
		v7 = [v4 /*: any*/, v5 /*: any*/];
	return {
		fragment: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Fragment',
			metadata: null,
			name: 'chatDetailSendMessageMutation',
			selections: [
				{
					alias: null,
					args: v1 /*: any*/,
					concreteType: null,
					kind: 'LinkedField',
					name: 'sendMessage',
					plural: false,
					selections: [
						{
							kind: 'InlineFragment',
							selections: [v2 /*: any*/, v3 /*: any*/],
							type: 'SendMessageSuccess',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v6 /*: any*/,
							type: 'ServerError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v6 /*: any*/,
							type: 'UnauthorizedError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v6 /*: any*/,
							type: 'NotFoundError',
							abstractKey: null,
						},
					],
					storageKey: null,
				},
			],
			type: 'Mutation',
			abstractKey: null,
		},
		kind: 'Request',
		operation: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Operation',
			name: 'chatDetailSendMessageMutation',
			selections: [
				{
					alias: null,
					args: v1 /*: any*/,
					concreteType: null,
					kind: 'LinkedField',
					name: 'sendMessage',
					plural: false,
					selections: [
						v3 /*: any*/,
						{
							kind: 'InlineFragment',
							selections: [v2 /*: any*/],
							type: 'SendMessageSuccess',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v7 /*: any*/,
							type: 'ServerError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v7 /*: any*/,
							type: 'UnauthorizedError',
							abstractKey: null,
						},
						{
							kind: 'InlineFragment',
							selections: v7 /*: any*/,
							type: 'NotFoundError',
							abstractKey: null,
						},
					],
					storageKey: null,
				},
			],
		},
		params: {
			cacheID: '706453ab0711f282edf5c702143b436d',
			id: null,
			metadata: {},
			name: 'chatDetailSendMessageMutation',
			operationKind: 'mutation',
			text: 'mutation chatDetailSendMessageMutation(\n  $input: SendMessageInput!\n) {\n  sendMessage(input: $input) {\n    __typename\n    ... on SendMessageSuccess {\n      success\n      __typename\n    }\n    ... on ServerError {\n      errorMessage\n      code\n      __typename\n    }\n    ... on UnauthorizedError {\n      errorMessage\n      code\n      __typename\n    }\n    ... on NotFoundError {\n      errorMessage\n      code\n      __typename\n    }\n  }\n}\n',
		},
	};
})();

(node as any).hash = 'fba4cfdeb8dad90930bde0730219d309';

export default node;

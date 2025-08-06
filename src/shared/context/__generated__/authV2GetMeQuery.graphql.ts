/**
 * @generated SignedSource<<918364a093b99e51549af29ed602eb46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type authV2GetMeQuery$variables = Record<PropertyKey, never>;
export type authV2GetMeQuery$data = {
	readonly me:
		| {
				readonly avatarUrl: string | null | undefined;
				readonly createdAt: any;
				readonly email: string;
				readonly id: string;
				readonly name: string | null | undefined;
				readonly updatedAt: any;
		  }
		| null
		| undefined;
};
export type authV2GetMeQuery = {
	response: authV2GetMeQuery$data;
	variables: authV2GetMeQuery$variables;
};

const node: ConcreteRequest = (() => {
	var v0 = [
		{
			alias: null,
			args: null,
			concreteType: 'User',
			kind: 'LinkedField',
			name: 'me',
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
				{
					alias: null,
					args: null,
					kind: 'ScalarField',
					name: 'createdAt',
					storageKey: null,
				},
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
	];
	return {
		fragment: {
			argumentDefinitions: [],
			kind: 'Fragment',
			metadata: null,
			name: 'authV2GetMeQuery',
			selections: v0 /*: any*/,
			type: 'Query',
			abstractKey: null,
		},
		kind: 'Request',
		operation: {
			argumentDefinitions: [],
			kind: 'Operation',
			name: 'authV2GetMeQuery',
			selections: v0 /*: any*/,
		},
		params: {
			cacheID: 'b37cfef3516cad1cdb75f510266768ba',
			id: null,
			metadata: {},
			name: 'authV2GetMeQuery',
			operationKind: 'query',
			text: 'query authV2GetMeQuery {\n  me {\n    id\n    name\n    email\n    avatarUrl\n    createdAt\n    updatedAt\n  }\n}\n',
		},
	};
})();

(node as any).hash = '925b7af18967e390d509a01f890662f1';

export default node;

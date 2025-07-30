import { APP_SCHEME, BASE_URL } from '@/shared/constants/auth';

export async function GET(request: Request) {
	const incomingParams = new URLSearchParams(request.url.split('?')[1]);
	const combinedPlatformState = incomingParams.get('state');

	if (!combinedPlatformState) {
		return Response.json(
			{
				error: 'STATE IS REQUIRED',
			},
			{ status: 400 },
		);
	}

	const platform = combinedPlatformState.split('|')[0];
	const state = combinedPlatformState.split('|')[1];

	const outgoingParams = new URLSearchParams({
		code: incomingParams.get('code')?.toString() || '',
		state,
	});

	return Response.redirect(
		`${platform === 'web' ? BASE_URL : APP_SCHEME}?${outgoingParams.toString()}`,
	);
}

import { decodeJwt, SignJWT } from 'jose';
import {
	COOKIE_MAX_AGE,
	COOKIE_NAME,
	COOKIE_OPTIONS,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	JWT_EXPIRATION_TIME,
	JWT_SECRET,
} from '@/shared/constants/auth';

export async function POST(request: Request) {
	// if using the `exchangeCodeAsync` from `expo-auth-session`
	// you must return a json with a key `access_token`

	const body = await request.formData();
	const code = body.getAll('code')[0] as string;

	const platform = body.getAll('platform')[0] as string;

	if (!code) {
		return Response.json(
			{
				error: 'Missing auth code',
			},
			{ status: 400 },
		);
	}

	if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
		return Response.json(
			{
				error: 'Missing Google client credentials',
			},
			{ status: 500 },
		);
	}

	const response = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		body: new URLSearchParams({
			code,
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			redirect_uri: GOOGLE_REDIRECT_URI,
			grant_type: 'authorization_code',
		}),
	});

	const data = await response.json();

	if (!data.id_token) {
		return Response.json(
			{
				error: 'No id_token found',
			},
			{ status: 400 },
		);
	}

	const idToken = data.id_token;

	const userInfo = decodeJwt(idToken) as object;

	const { exp, ...userInfoWithoutExp } = userInfo as any;

	// user id
	const sub = (userInfo as { sub: string }).sub;

	// current time in seconds
	const issuedAt = Math.floor(Date.now() / 1000);

	const accessToken = await new SignJWT(userInfoWithoutExp)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime(JWT_EXPIRATION_TIME)
		.setSubject(sub)
		.setIssuedAt(issuedAt)
		.sign(new TextEncoder().encode(JWT_SECRET));

	if (platform === 'web') {
		const response = Response.json({
			success: true,
			issuedAt,
			expiresAt: issuedAt + COOKIE_MAX_AGE,
		});

		response.headers.set(
			'Set-Cookie',
			[
				`${COOKIE_NAME}=${accessToken}`,
				`Max-Age=${COOKIE_OPTIONS.maxAge}`,
				`Path=${COOKIE_OPTIONS.path}`,
				`${COOKIE_OPTIONS.httpOnly ? 'HttpOnly;' : ''}`,
				`${COOKIE_OPTIONS.secure ? 'Secure;' : ''}`,
				`SameSite=${COOKIE_OPTIONS.sameSite}`,
			].join('; '),
		);

		return response;
	}

	return Response.json({
		accessToken,
	});
}

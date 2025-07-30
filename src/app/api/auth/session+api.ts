import { jwtVerify } from 'jose';
import { COOKIE_NAME, JWT_SECRET } from '@/shared/constants/auth';

export async function GET(request: Request) {
	try {
		const cookieHeader = request.headers.get('Cookie');

		if (!cookieHeader) {
			return Response.json(
				{
					success: false,
					message: 'No cookie found',
				},
				{ status: 401 },
			);
		}

		// Parse cookies and their attributes
		const cookies: Record<string, Record<string, string>> = {};

		cookieHeader.split(';').forEach((cookie) => {
			const trimmedCookie = cookie.trim();

			// Check if this is a cookie-value pair or an attribute
			if (trimmedCookie.includes('=')) {
				const [key, value] = trimmedCookie.split('=');
				const cookieName = key.trim();

				// Initialize the cookie entry if it doesn't exist
				if (!cookies[cookieName]) {
					cookies[cookieName] = { value: value };
				} else {
					cookies[cookieName].value = value;
				}
			} else if (trimmedCookie.toLowerCase() === 'httponly') {
				// Handle HttpOnly attribute
				const lastCookieName = Object.keys(cookies).pop();
				if (lastCookieName) {
					cookies[lastCookieName].httpOnly = 'true';
				}
			} else if (trimmedCookie.toLowerCase().startsWith('expires=')) {
				// Handle Expires attribute
				const lastCookieName = Object.keys(cookies).pop();
				if (lastCookieName) {
					cookies[lastCookieName].expires = trimmedCookie.substring(8);
				}
			} else if (trimmedCookie.toLowerCase().startsWith('max-age=')) {
				// Handle Max-Age attribute
				const lastCookieName = Object.keys(cookies).pop();
				if (lastCookieName) {
					cookies[lastCookieName].maxAge = trimmedCookie.substring(8);
				}
			}
		});

		if (!cookies[COOKIE_NAME] || !cookies[COOKIE_NAME].value) {
			return Response.json({ error: 'not authenticated' }, { status: 401 });
		}

		const token = cookies[COOKIE_NAME].value as string;

		// verify token
		try {
			// verify token
			const verified = await jwtVerify(
				token,
				new TextEncoder().encode(JWT_SECRET),
			);

			let cookieExpiration: number | null = null;
			if (cookies[COOKIE_NAME].maxAge) {
				const maxAge = parseInt(cookies[COOKIE_NAME].maxAge, 10);

				const issuedAt =
					(verified.payload.iat as number) || Math.floor(Date.now() / 1000);
				cookieExpiration = issuedAt + maxAge;
			}

			return Response.json({
				...verified.payload,
				cookieExpiration,
			});
		} catch (err) {
			console.error(err);
			return Response.json({ error: 'invalid token' }, { status: 401 });
		}
	} catch (err) {
		console.error(err);
		return Response.json(
			{
				success: false,
				message: 'Error fetching session',
			},
			{ status: 500 },
		);
	}
}

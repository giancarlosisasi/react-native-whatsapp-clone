// export const COOKIE_NAME = 'whatstappgio';
// export const REFRESH_COOKIE_NAME = 'whatstappgio-refresh';
// export const COOKIE_MAX_AGE = 20; // 20 seconds
// export const JWT_EXPIRATION_TIME = '20s';
// export const REFRESH_TOKEN_EXPIRY = '30d';
// export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds
// export const TOKEN_KEY_NAME = 'accessToken';

import { isMobile } from './platform';

// export const REFRESH_BEFORE_EXPIRY_SEC = 60; // refresh token 1 minute before expiry

// export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// export const GOOGLE_REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/callback`;
// export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
// export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME;

export const AUTH_GOOGLE_OAUTH_URL =
	process.env.EXPO_PUBLIC_AUTH_GOOGLE_OAUTH_URL;
export const AUTH_GOOGLE_OAUTH_URL_WEB =
	process.env.EXPO_PUBLIC_AUTH_GOOGLE_OAUTH_URL_WEB;

const getClientType = () => {
	if (isMobile) {
		return 'mobile';
	}

	return 'web';
};

export const AUTH_CLIENT_TYPE = getClientType();

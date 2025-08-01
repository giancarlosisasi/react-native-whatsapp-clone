import type { TAuthUser } from '@/shared/context/auth';
import { withAuth } from '@/shared/utils/middleware';

// Example protected data
const mockData = {
	secretMessage: 'This is protected data!',
	timestamp: new Date().toISOString(),
};

export const GET = withAuth(async (req: Request, user: TAuthUser) => {
	// You can use the authenticated user info in your response
	return Response.json({
		data: mockData,
		user: {
			name: user.name,
			email: user.email,
		},
	});
});

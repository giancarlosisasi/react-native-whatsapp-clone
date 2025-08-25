import { Suspense } from 'react';
import { FullScreenActivityIndicator } from '@/shared/components/full-screen-activity-indicator';

export const SuspenseChatsView = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Suspense fallback={<FullScreenActivityIndicator />}>{children}</Suspense>
	);
};

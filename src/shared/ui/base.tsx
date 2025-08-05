import { View as RNView, type ViewProps } from 'react-native';
import { colors } from '@/theme/colors';

export const View = ({
	style,
	debug = false,
	...props
}: ViewProps & { debug?: boolean }) => {
	return (
		<RNView
			style={[
				style,
				debug && {
					borderWidth: 1,
					borderColor: colors.primary,
					borderStyle: 'dashed',
				},
			]}
			{...props}
		/>
	);
};

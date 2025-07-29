import type { ConfigContext, ExpoConfig } from 'expo/config';

function createConfig({ config }: ConfigContext): ExpoConfig {
	return {
		...config,
		name: 'whatstappgio',
		slug: 'whatstappgio',
	};
}

export default createConfig;

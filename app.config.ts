import type { ConfigContext, ExpoConfig } from 'expo/config';

function createConfig({ config }: ConfigContext): ExpoConfig {
	return {
		...config,
		name: 'luna',
		slug: 'luna',
	};
}

export default createConfig;

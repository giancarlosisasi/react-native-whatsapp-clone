import type { ConfigContext, ExpoConfig } from 'expo/config';

function createConfig({ config }: ConfigContext): ExpoConfig {
	return {
		...config,
		name: 'whatstapp',
		slug: 'whatstapp',
	};
}

export default createConfig;

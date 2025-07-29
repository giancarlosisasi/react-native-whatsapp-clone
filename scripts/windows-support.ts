import fs from 'node:fs';
import path from 'node:path';

async function main() {
	const isWindows = process.platform === 'win32';

	// fix ninja build, windows errors for long paths
	if (isWindows) {
		fixWindowsLongPathsErrors();
	}
}

/**
 * In windows, the default path length is 260 characters.
 * This function will make sure to use a different ninja binary that supports long paths.
 * It will also make sure to use a different object path max value.
 * Essentially, this will add the required gradle arguments in the following files:
 * - android/app/build.gradle
 * - node_modules/react-native-reanimated/android/build.gradle
 * - node_modules/react-native-worklets/android/build.gradle
 *
 * In case we want to use another package that has native code, we need to add the support for it here.
 */
function fixWindowsLongPathsErrors() {
	const androidBuildGradlePath = path.join(
		__dirname,
		'..',
		'android',
		'app',
		'build.gradle',
	);
	const reanimatedBuildGradlePath = path.join(
		__dirname,
		'..',
		'node_modules',
		'react-native-reanimated',
		'android',
		'build.gradle',
	);
	const workletsBuildGradlePath = path.join(
		__dirname,
		'..',
		'node_modules',
		'react-native-worklets',
		'android',
		'build.gradle',
	);

	const androidBuildGradleNewContent = fs.readFileSync(
		path.join(__dirname, './templates/expo-android-gradle.txt'),
		'utf8',
	);
	const reanimatedBuildGradleNewContent = fs.readFileSync(
		path.join(__dirname, './templates/react-native-reanimated-gradle.txt'),
		'utf8',
	);
	const workletsBuildGradleNewContent = fs.readFileSync(
		path.join(__dirname, './templates/react-native-worklets-gradle.txt'),
		'utf8',
	);

	fs.writeFileSync(
		androidBuildGradlePath,
		androidBuildGradleNewContent,
		'utf8',
	);
	console.info('>> android/app/build.gradle modified successfully');
	fs.writeFileSync(
		reanimatedBuildGradlePath,
		reanimatedBuildGradleNewContent,
		'utf8',
	);
	console.info(
		'>> node_modules/react-native-reanimated/android/build.gradle modified successfully',
	);
	fs.writeFileSync(
		workletsBuildGradlePath,
		workletsBuildGradleNewContent,
		'utf8',
	);
	console.info(
		'>> node_modules/react-native-worklets/android/build.gradle modified successfully',
	);

	console.info('> Success to fix ninja build, windows errors for long paths');
}

main();

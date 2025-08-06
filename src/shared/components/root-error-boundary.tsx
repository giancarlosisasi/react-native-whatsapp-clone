import React, { type ComponentType, type PropsWithChildren } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

type TFallbackComponentProps = { error: Error; resetError: () => void };

const FallbackComponent = (props: TFallbackComponentProps) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Oops!</Text>
				<Text style={styles.subtitle}>{"There's an error"}</Text>
				<Text style={styles.error}>{props.error.toString()}</Text>
				<TouchableOpacity style={styles.button} onPress={props.resetError}>
					<Text style={styles.buttonText}>Try again</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

type Props = PropsWithChildren<{
	FallbackComponent: ComponentType<TFallbackComponentProps>;
	onError?: (error: Error, stackTrace: string) => void;
}>;

type State = { error: Error | null };
export class RootErrorBoundary extends React.Component<Props, State> {
	state: State = { error: null };

	static defaultProps: {
		FallbackComponent: ComponentType<TFallbackComponentProps>;
	} = {
		FallbackComponent: FallbackComponent,
	};

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: { componentStack: string }) {
		if (typeof this.props.onError === 'function') {
			this.props.onError(error, info.componentStack);
		}
	}

	resetError: () => void = () => {
		this.setState({ error: null });
	};

	render() {
		const { FallbackComponent } = this.props;

		return this.state.error ? (
			<FallbackComponent
				error={this.state.error}
				resetError={this.resetError}
			/>
		) : (
			this.props.children
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fafafa',
		flex: 1,
		justifyContent: 'center',
	},
	content: {
		marginHorizontal: 16,
	},
	title: {
		fontSize: 48,
		fontWeight: '300',
		paddingBottom: 16,
		color: '#000',
	},
	subtitle: {
		fontSize: 32,
		fontWeight: '800',
		color: '#000',
	},
	error: {
		paddingVertical: 16,
	},
	button: {
		backgroundColor: '#2196f3',
		borderRadius: 50,
		padding: 16,
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		textAlign: 'center',
	},
});

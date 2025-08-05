import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import Animated, {
	CurvedTransition,
	FadeInUp,
	FadeOutUp,
} from 'react-native-reanimated';
import { View } from '@/shared/ui/base';
import { defaultStyles } from '@/shared/ui/default-styles';
import { SegmentedControl } from '@/shared/ui/segmented-control';
import { colors } from '@/theme/colors';
import calls from '../../../../assets/data/calls.json';

const transition = CurvedTransition.delay(100);

export default function Calls() {
	const [isEditing, setIsEditing] = useState(false);
	const [selectedOption, setSelectedOption] = useState<'All' | 'Missed'>('All');
	const [items, setItems] = useState(calls);

	const onEdit = () => {
		setIsEditing((prev) => !prev);
	};

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<Stack.Screen
				options={{
					headerTitle: () => (
						<View style={{ width: '100%', alignItems: 'center' }}>
							<SegmentedControl
								options={['All', 'Missed']}
								selectedOption={selectedOption}
								onOptionPress={(option) => {
									setSelectedOption(option as 'All' | 'Missed');

									const filteredItems =
										option === 'Missed'
											? calls.filter((item) => item.missed)
											: calls;
									setItems(filteredItems);
								}}
							/>
						</View>
					),
					headerLeft: () => (
						<TouchableOpacity onPress={onEdit}>
							<Text style={{ color: colors.primary, fontSize: 18 }}>
								{isEditing ? 'Done' : 'Edit'}
							</Text>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity>
							<Ionicons name='call-outline' color={colors.primary} size={30} />
						</TouchableOpacity>
					),
				}}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior='automatic'
				contentContainerStyle={{
					paddingTop: 100,
					paddingBottom: 40,
				}}
			>
				<Animated.View style={defaultStyles.block} layout={transition}>
					<Animated.FlatList
						skipEnteringExitingAnimations
						data={items}
						scrollEnabled={false}
						keyExtractor={(item) => item.id.toString()}
						ItemSeparatorComponent={() => (
							<View style={defaultStyles.separator} />
						)}
						itemLayoutAnimation={transition}
						renderItem={({ item, index }) => (
							<Animated.View
								entering={FadeInUp.delay(index * 10)}
								exiting={FadeOutUp}
							>
								<View style={defaultStyles.item}>
									<Image source={{ uri: item.img }} style={styles.avatar} />

									<View style={{ flex: 1, gap: 2 }}>
										<Text
											style={{
												fontSize: 18,
												color: item.missed ? colors.red : colors.textPrimary,
											}}
										>
											{item.name}
										</Text>

										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												gap: 4,
											}}
										>
											<Ionicons
												name={item.video ? 'videocam' : 'call'}
												size={16}
												color={colors.gray}
											/>
											<Text style={{ color: colors.gray, flex: 1 }}>
												{item.incoming ? 'Incoming' : 'Outgoing'}
											</Text>
										</View>
									</View>

									<View
										style={{
											gap: 6,
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<Text style={{ color: colors.gray }}>
											{format(item.date, 'MM.dd.yy')}
										</Text>
										<Ionicons
											name='information-circle-outline'
											size={24}
											color={colors.primary}
										/>
									</View>
								</View>
							</Animated.View>
						)}
					/>
				</Animated.View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
});

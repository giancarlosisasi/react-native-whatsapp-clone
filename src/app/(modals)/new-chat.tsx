import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { defaultStyles } from '@/shared/ui/default-styles';
import { colors } from '@/theme/colors';
import contacts from '../../../assets/data/contacts.json';

export default function NewChat() {
	const data: Array<{
		value: string;
		name: string;
		img: string;
		desc: string;
		key: string;
	}> = contacts.map((contact, index) => ({
		value: `${contact.first_name} ${contact.last_name}`,
		name: `${contact.first_name} ${contact.last_name}`,
		img: contact.img,
		desc: contact.desc,
		key: `${contact.first_name} ${contact.last_name}-${index}`,
	}));

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					paddingTop: 60,
					backgroundColor: colors.background,
				}}
			>
				<AlphabetList
					data={data}
					indexLetterStyle={{
						color: colors.primary,
						fontSize: 12,
					}}
					indexContainerStyle={{
						width: 24,
						backgroundColor: colors.background,
					}}
					style={{
						marginLeft: 24,
					}}
					renderCustomItem={(item: any) => (
						<>
							<View style={styles.listItemContainer}>
								<Image
									source={{ uri: item.img }}
									style={{ width: 40, height: 40, borderRadius: 20 }}
								/>
								<View>
									<Text style={{ color: colors.textPrimary, fontSize: 14 }}>
										{item.value}
									</Text>
									<Text
										style={{
											color: colors.gray,
											fontSize: 12,
										}}
									>
										{item.desc.length > 40
											? `${item.desc.slice(0, 40)}...`
											: item.desc}
									</Text>
								</View>
							</View>
							<View style={defaultStyles.separator} />
						</>
					)}
					renderCustomSectionHeader={(section) => (
						<View style={styles.sectionHeaderContainer}>
							<Text>{section.title}</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	sectionHeaderContainer: {
		backgroundColor: colors.background,
		justifyContent: 'center',
		paddingHorizontal: 14,
		paddingVertical: 14,
	},
	listItemContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 14,
		alignItems: 'center',
		gap: 12,
		height: 60,
		backgroundColor: colors.white,
	},
});

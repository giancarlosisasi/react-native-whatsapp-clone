import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import {
	Alert,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useAuth, useMe } from '@/shared/context/auth';
import { BoxedIcon } from '@/shared/ui/boxed-icon';
import { defaultStyles } from '@/shared/ui/default-styles';
import { colors } from '@/theme/colors';

type TListItem = {
	name: string;
	icon: keyof typeof Ionicons.glyphMap;
	backgroundColor: string;
};

const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Community() {
	const { me } = useMe();
	const { signout } = useAuth();

	const onCopyEmail = async () => {
		await Clipboard.setStringAsync(me.email);
		Alert.alert('Success', 'Email copied to clipboard', [
			{
				text: 'Ok',
			},
		]);
	};

	// const devices: TListItem[] = [
	// 	{
	// 		name: 'Broadcast Lists',
	// 		icon: 'megaphone',
	// 		backgroundColor: colors.green,
	// 	},
	// 	{
	// 		name: 'Starred Messages',
	// 		icon: 'star',
	// 		backgroundColor: colors.yellow,
	// 	},
	// 	{
	// 		name: 'Linked Devices',
	// 		icon: 'laptop-outline',
	// 		backgroundColor: colors.green,
	// 	},
	// ];

	const items: TListItem[] = [
		{
			name: 'Account',
			icon: 'key',
			backgroundColor: colors.primary,
		},
		{
			name: 'Privacy',
			icon: 'lock-closed',
			backgroundColor: '#33A5D1',
		},
		{
			name: 'Chats',
			icon: 'logo-whatsapp',
			backgroundColor: colors.green,
		},
		{
			name: 'Notifications',
			icon: 'notifications',
			backgroundColor: colors.red,
		},
		{
			name: 'Storage and Data',
			icon: 'repeat',
			backgroundColor: colors.green,
		},
	];

	// const support: TListItem[] = [
	// 	{
	// 		name: 'Help',
	// 		icon: 'information',
	// 		backgroundColor: colors.primary,
	// 	},
	// 	{
	// 		name: 'Tell a Friend',
	// 		icon: 'heart',
	// 		backgroundColor: colors.red,
	// 	},
	// ];

	const renderSectionList = (data: TListItem[]) => {
		return (
			<View style={defaultStyles.block}>
				<FlatList
					scrollEnabled={false}
					data={data}
					ItemSeparatorComponent={() => (
						<View style={defaultStyles.separator} />
					)}
					renderItem={({ item }) => {
						return (
							<View style={defaultStyles.item}>
								<BoxedIcon
									name={item.icon}
									backgroundColor={item.backgroundColor}
								/>
								<Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
								<Ionicons
									name='chevron-forward'
									size={20}
									color={colors.gray}
								/>
							</View>
						);
					}}
				/>
			</View>
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<View style={styles.container}>
				<View style={styles.avatarContainer}>
					<Image
						source={me.avatarUrl}
						placeholder={blurhash}
						contentFit='cover'
						transition={1000}
						style={styles.avatar}
					/>
					<View style={styles.userNameContainer}>
						<Text style={styles.userNameText}>{me.name || me.email}</Text>
						<TouchableOpacity
							onPress={() => {
								onCopyEmail();
							}}
						>
							<Text style={styles.idText}>ID: {me.email}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<ScrollView contentInsetAdjustmentBehavior='automatic'>
				{/* {renderSectionList(devices)} */}
				{renderSectionList(items)}
				{/* {renderSectionList(support)} */}

				<TouchableOpacity onPress={() => signout()}>
					<Text
						style={{
							color: colors.primary,
							fontSize: 18,
							textAlign: 'center',
							paddingVertical: 14,
						}}
					>
						Log out
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: colors.primary,
	},
	avatarContainer: {
		width: '100%',
		height: 224,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
	},
	userNameContainer: {
		gap: 4,
		alignItems: 'center',
	},
	userNameText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.primary,
	},
	idText: {
		fontSize: 14,
		color: colors.gray,
	},
});

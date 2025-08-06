import Ionicons from '@expo/vector-icons/Ionicons';
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useAuth } from '@/shared/context/auth';
import { BoxedIcon } from '@/shared/ui/boxed-icon';
import { defaultStyles } from '@/shared/ui/default-styles';
import { colors } from '@/theme/colors';

type TListItem = {
	name: string;
	icon: keyof typeof Ionicons.glyphMap;
	backgroundColor: string;
};

export default function Community() {
	const devices: TListItem[] = [
		{
			name: 'Broadcast Lists',
			icon: 'megaphone',
			backgroundColor: colors.green,
		},
		{
			name: 'Starred Messages',
			icon: 'star',
			backgroundColor: colors.yellow,
		},
		{
			name: 'Linked Devices',
			icon: 'laptop-outline',
			backgroundColor: colors.green,
		},
	];

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

	const support: TListItem[] = [
		{
			name: 'Help',
			icon: 'information',
			backgroundColor: colors.primary,
		},
		{
			name: 'Tell a Friend',
			icon: 'heart',
			backgroundColor: colors.red,
		},
	];

	const { signout } = useAuth();

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
			<ScrollView contentInsetAdjustmentBehavior='automatic'>
				{renderSectionList(devices)}
				{renderSectionList(items)}
				{renderSectionList(support)}

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

import { useState } from 'react';
import {
	ActivityIndicator,
	Button,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChatRow } from '@/shared/components/chat-row';
import { useAuth } from '@/shared/context/auth';
import { defaultStyles } from '@/shared/ui/default-styles';
import { colors } from '@/theme/colors';
import chatsData from '../../../../assets/data/chats.json';

export default function Chats() {
	const [chats, setChats] = useState<typeof chatsData>(chatsData);

	return (
		<ScrollView
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={{
				paddingBottom: 40,
				paddingTop: 120,
				backgroundColor: colors.white,
			}}
		>
			<FlatList
				scrollEnabled={false}
				data={chats}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
				renderItem={({ item }) => <ChatRow {...item} />}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({});

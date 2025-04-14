import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import { Notification } from '@/src/types/notification.type'
import { formatRelativeTimeFromNow } from '@/src/utils/format.util'

interface NotificationCardProps {
    itemData: Notification
    onBtnMorePress: () => void
}

function NotificationCard({ itemData, onBtnMorePress }: NotificationCardProps) {
    return (
        <View style={[styles.container, !itemData.is_read && styles.unread]}>
            <View style={styles.avatar}>
                <MyIcon name='AbWorkout' size={25} />
            </View>
            <View style={styles.content}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
                    {itemData.title}
                </Text>
                <Text style={styles.time}>{formatRelativeTimeFromNow(itemData.created_at)}</Text>
            </View>
            <TouchableOpacity onPress={onBtnMorePress} hitSlop={10}>
                <MyIcon name='moreIcon' size={14} />
            </TouchableOpacity>
        </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    unread: {
        backgroundColor: '#EBF8FF'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    content: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#1D1617'
    },
    time: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
        color: '#7B6F72',
        marginTop: 5
    }
})

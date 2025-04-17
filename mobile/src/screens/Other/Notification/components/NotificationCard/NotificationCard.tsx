import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/components/Icon'
import AvatarWithIcon from '@/components/AvatarWithIcon'
import { Notification } from '@/types/notification.type'
import { formatRelativeTimeFromNow } from '@/utils/format.util'
import { COLOR_BRANDS } from '@/constants/common.constants'
import { IconName } from '@/constants/icon.constants'
import { getAvatarWithIconNotify } from '@/utils/common.util'

interface NotificationCardProps {
    itemData: Notification
    onCardPress?: () => void
    onBtnMorePress: () => void
}

function NotificationCard({ itemData, onCardPress, onBtnMorePress }: NotificationCardProps) {
    const { icon, colors } = getAvatarWithIconNotify(itemData.type)
    const containerStyle = [styles.container, !itemData.is_read && styles.unread]
    return (
        <TouchableOpacity style={containerStyle} onPress={onCardPress} activeOpacity={0.9}>
            <AvatarWithIcon size={45} colors={colors} icon={icon} />
            <View style={styles.content}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
                    {itemData.title}
                </Text>
                <Text style={styles.time}>{formatRelativeTimeFromNow(itemData.created_at)}</Text>
            </View>
            <TouchableOpacity onPress={onBtnMorePress} hitSlop={10} style={styles.moreBtn}>
                <MyIcon name='moreIcon' size={14} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    unread: {
        backgroundColor: '#EBF8FF'
    },
    content: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        fontSize: 13,
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
    },
    moreBtn: {
        padding: 4,
        zIndex: 1
    }
})

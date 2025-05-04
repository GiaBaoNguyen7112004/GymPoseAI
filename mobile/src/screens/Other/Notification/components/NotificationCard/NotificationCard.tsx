import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AvatarWithIcon from '@/components/AvatarWithIcon'
import { Notification } from '@/types/notification.type'
import { formatRelativeTimeFromNow } from '@/utils/format.util'
import { getAvatarWithIconNotify } from '@/utils/common.util'
import { Feather } from '@expo/vector-icons'
import { memo } from 'react'

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
            <AvatarWithIcon size={55} colors={colors} icon={icon} />
            <View style={styles.content}>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>
                    {itemData.title}
                </Text>
                <Text style={styles.time}>{formatRelativeTimeFromNow(itemData.created_at)}</Text>
            </View>
            <TouchableOpacity onPress={onBtnMorePress} hitSlop={10} style={styles.moreBtn}>
                <Feather name='more-horizontal' size={24} color='black' />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default memo(NotificationCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    unread: {
        backgroundColor: '#F0F4F8'
    },
    content: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18,
        color: '#1D1617',
        paddingRight: 30
    },
    time: {
        fontSize: 12,
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

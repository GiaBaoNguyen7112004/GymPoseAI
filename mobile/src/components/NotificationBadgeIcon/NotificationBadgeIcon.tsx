import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'
import useNewNotificationCount from '@/hooks/useNewNotificationCount'

interface NotificationBadgeIconProps {
    iconName: IconName
    activeIconName?: IconName
    size?: number
    focused?: boolean
    color?: string
}

function NotificationBadgeIcon({
    iconName: iconName,
    activeIconName,
    size = 24,
    focused = false,
    color
}: NotificationBadgeIconProps) {
    const displayIcon = focused && activeIconName ? activeIconName : iconName
    const { notificationCount: count } = useNewNotificationCount()

    return (
        <View style={styles.container}>
            <MyIcon name={displayIcon} size={focused ? size + 2 : size} color={color} />
            {count > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 4,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    }
})

export default memo(NotificationBadgeIcon)

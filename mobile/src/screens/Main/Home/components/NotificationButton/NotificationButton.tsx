import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import MyIcon from '@/components/Icon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { notificationApi } from '@/services/rest'
import { memo } from 'react'

interface NotificationButtonProps {
    onPress: () => void
}

function NotificationButton({ onPress }: NotificationButtonProps) {
    const { data } = useQuery({
        queryKey: ['new-notification'],
        queryFn: notificationApi.getNewNotificationCount,
        staleTime: 1000 * 60 * 5
    })
    const notificationCount = data?.data?.data?.new_notification_count ?? 0

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MyIcon name='notificationIcon' size={22} />
            {notificationCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{notificationCount > 99 ? '99+' : notificationCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        top: 1,
        right: 1,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 4,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    }
})

export default memo(NotificationButton)

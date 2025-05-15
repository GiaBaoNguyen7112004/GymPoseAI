import React, { memo, useCallback } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/components/Icon'
import AvatarWithIcon from '@/components/AvatarWithIcon'
import { Notification } from '@/types/notification.type'
import { getAvatarWithIconNotify } from '@/utils/common.util'
import { Use } from 'react-native-svg'

interface Props {
    onDeleteNotification: (id: string) => void
    notificationData: Notification | null
}

function NotificationDetail({ onDeleteNotification, notificationData }: Props) {
    if (!notificationData) return null

    const { icon, colors } = getAvatarWithIconNotify(notificationData.type)
    const titleFallback = notificationData.title || 'Notification Options'
    const descFallback = notificationData.description || 'Notification Options'

    const handleDelete = useCallback(() => {
        onDeleteNotification(notificationData.id)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <AvatarWithIcon size={80} icon={icon} colors={colors} />
                <View style={styles.content}>
                    <Text style={styles.title}>{titleFallback}</Text>
                    <Text style={styles.description}>{descFallback}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <View style={styles.iconWrapper}>
                        <MyIcon name='closeSquareBold' size={20} />
                    </View>
                    <Text style={styles.deleteText}>Delete this notification</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default memo(NotificationDetail)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20
    },
    content: {
        marginTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DDDADA'
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617',
        textAlign: 'center',
        paddingHorizontal: 40
    },
    description: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '400',
        color: '#7B6F72',
        textAlign: 'center'
    },
    deleteButton: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconWrapper: {
        width: 35,
        height: 35,
        borderRadius: 999,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617'
    }
})

import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import MyIcon from '@/src/components/Icon'
import NavigationBar from '@/src/components/NavigationBar/NavigationBar'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { IconName } from '@/src/constants/icon.constants'

const colors: [string, string, ...string[]][] = [
    ['#92A3FD', '#9DCEFF'],
    ['#EEA4CE', '#C58BF2'],
    ['#FFC2A0', '#FF9671'],
    ['#A0E9FF', '#71C5FF'],
    ['#D2A0FF', '#A084E2']
]

const names: IconName[] = ['movement1', 'movement3']

interface NotificationItem {
    id: string
    title: string
    time: string
    read: boolean
    randomColor?: [string, string, ...string[]]
    randomIcon?: IconName
}

function Notification() {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['25%', '50%'], [])
    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Giả lập fetch API
        setTimeout(() => {
            const fetchedData = [
                {
                    id: '1',
                    title: 'Congratulations, You have finished your workout!',
                    time: '3 hours ago',
                    read: false
                },
                {
                    id: '2',
                    title: "Don't miss your lowerbody workout",
                    time: '1 day ago',
                    read: true
                },
                {
                    id: '3',
                    title: 'It’s time for your upperbody workout',
                    time: '2 days ago',
                    read: false
                }
            ]

            const processedData = fetchedData.map((item) => ({
                ...item,
                randomColor: colors[Math.floor(Math.random() * colors.length)],
                randomIcon: names[Math.floor(Math.random() * names.length)]
            }))

            setNotifications(processedData)
            setIsLoading(false)
        }, 1000) // Giả lập 1 giây tải dữ liệu
    }, [])

    const handleMorePress = useCallback(
        (item: NotificationItem) => () => {
            setSelectedNotification(item)
            bottomSheetRef.current?.expand()
        },
        []
    )

    const handleNotificationPress = useCallback(
        (item: NotificationItem) => () => {
            setNotifications((prevNotifications) =>
                prevNotifications.map((noti) => (noti.id === item.id ? { ...noti, read: true } : noti))
            )
        },
        []
    )

    const handleDeleteNotification = useCallback(() => {
        if (selectedNotification) {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((noti) => noti.id !== selectedNotification.id)
            )
            bottomSheetRef.current?.close()
            setSelectedNotification(null)
        }
    }, [selectedNotification])

    const renderItem = useCallback(
        ({ item }: { item: NotificationItem }) => {
            return (
                <TouchableOpacity
                    onPress={handleNotificationPress(item)}
                    style={[styles.notiItem, !item.read && styles.unread]}
                >
                    <View style={[styles.notiItem__avatar, { backgroundColor: item.randomColor![0] }]}>
                        <MyIcon name={item.randomIcon!} size={25} />
                    </View>
                    <View style={styles.notiItem__content}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.notiItem__title}>
                            {item.title}
                        </Text>
                        <Text style={styles.notiItem__time}>{item.time}</Text>
                    </View>
                    <TouchableOpacity onPress={handleMorePress(item)}>
                        <MyIcon name='moreIcon' size={14} style={styles.moreIcon} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        },
        [handleNotificationPress, handleMorePress]
    )

    const renderEmpty = useCallback(
        () => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>You have no notifications</Text>
            </View>
        ),
        []
    )

    const renderLoading = useCallback(
        () => (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#DDDADA' />
            </View>
        ),
        []
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.wrapperScreen}>
                <View>
                    <NavigationBar title={'Notifications'} />
                </View>
                {isLoading ? (
                    renderLoading()
                ) : notifications.length > 0 ? (
                    <FlatList
                        data={notifications}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.notificationContainer}
                    />
                ) : (
                    renderEmpty()
                )}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backdropComponent={BottomSheetBackdrop}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <View style={styles.bottomSheet__avatar}>
                            <MyIcon name='AbWorkout' size={60} />
                        </View>
                        <View style={styles.bottomSheet__content}>
                            <Text style={styles.bottomSheet__title}>
                                {selectedNotification?.title || 'Notification Options'}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.bottomSheet__btn} onPress={handleDeleteNotification}>
                            <View style={styles.bottomSheet_IconWrapper}>
                                <MyIcon name='closeSquareBold' size={20} />
                            </View>
                            <Text style={styles.bottomSheet__btnText}>Delete this notification</Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Notification

const styles = StyleSheet.create({
    wrapperScreen: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    notificationContainer: {
        marginTop: 30,
        flex: 1
    },
    notiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingHorizontal: 10
    },
    notiItem__avatar: {
        width: 40,
        height: 40,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    notiItem__content: {
        flex: 1,
        marginLeft: 10
    },
    notiItem__title: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#1D1617'
    },
    notiItem__time: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
        color: '#7B6F72',
        marginTop: 5
    },
    moreIcon: {
        marginHorizontal: 17,
        padding: 10
    },
    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    bottomSheet__avatar: {
        width: 70,
        height: 70,
        borderRadius: 999,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheet__content: {
        marginTop: 20,
        borderBottomColor: '#DDDADA',
        borderBottomWidth: 0.5,
        paddingBottom: 20
    },
    bottomSheet__title: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617',
        textAlign: 'center'
    },
    bottomSheet__btn: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomSheet_IconWrapper: {
        width: 35,
        height: 35,
        borderRadius: 999,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheet__btnText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617'
    },
    unread: {
        backgroundColor: '#EBF8FF'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        marginBottom: 10
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#7B6F72'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

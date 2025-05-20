import { memo, useCallback, useState } from 'react'
import { View, RefreshControl, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import Loader from '@/components/Loader'
import NotificationCard from '../NotificationCard'
import { Notification } from '@/types/notification.type'
import { defaultKeyExtractor } from '@/utils/list'
import NavigationBarV2 from '@/components/NavigationBarV2'

interface Props {
    notifications: Notification[]
    onRefresh: () => void
    isFetching: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
    hasNextPage?: boolean
    onCardPress: (item: Notification) => void
    onMorePress: (item: Notification) => void
    handlePressNavMore: () => void
    gotoSearchWorkout: () => void
}

interface HeaderItem {
    title: string
    id: string
    isHeader: true
}

type ListItem = Notification | HeaderItem

const NotificationList: React.FC<Props> = ({
    notifications,
    onRefresh,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    onCardPress,
    onMorePress,
    handlePressNavMore,
    gotoSearchWorkout
}) => {
    const [showAllEarlier, setShowAllEarlier] = useState(false)

    const { today, earlier } = groupNotifications(notifications)

    const listData = useCallback((): ListItem[] => {
        const data: ListItem[] = []

        if (today.length) {
            data.push({ title: 'Today', id: 'header-Today', isHeader: true }, ...today)
        }

        if (earlier.length) {
            data.push({ title: 'Earlier', id: 'header-Earlier', isHeader: true })
            const displayEarlier = showAllEarlier ? earlier : earlier.slice(0, 2)
            data.push(...displayEarlier)
        }

        return data
    }, [today, earlier, showAllEarlier])()

    const renderHeader = ({ item }: { item: HeaderItem }) => <Text style={styles.sectionHeader}>{item.title}</Text>

    const renderNotificationItem = ({ item }: { item: Notification }) => (
        <NotificationCard
            itemData={item}
            onCardPress={() => onCardPress(item)}
            onBtnMorePress={() => onMorePress(item)}
        />
    )

    const renderItem = ({ item }: { item: ListItem }) => {
        return 'isHeader' in item ? renderHeader({ item }) : renderNotificationItem({ item: item as Notification })
    }

    const keyExtractor = (item: ListItem) => ('isHeader' in item ? item.id : defaultKeyExtractor(item as Notification))

    const renderFooter = () => {
        if (earlier.length > 2 && !showAllEarlier) {
            return (
                <TouchableOpacity style={styles.footerButton} onPress={() => setShowAllEarlier(true)}>
                    <Text style={styles.footerButtonText}>See Previous Notifications</Text>
                </TouchableOpacity>
            )
        }

        if (isFetchingNextPage) {
            return (
                <View style={styles.loadingWrapper}>
                    <Loader />
                </View>
            )
        }

        return null
    }

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <LottieView
                source={require('@/assets/animations/empty_cart.json')}
                autoPlay
                loop
                style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>You have no notifications</Text>
        </View>
    )

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    return (
        <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.notificationContainer}
            ListHeaderComponent={
                <NavigationBarV2
                    title='Notification'
                    searchAction={gotoSearchWorkout}
                    MoreActions={handlePressNavMore}
                />
            }
            ListEmptyComponent={renderEmptyComponent}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.3}
            onEndReached={handleEndReached}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={onRefresh} />}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
        />
    )
}

export default memo(NotificationList)

const isToday = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T'))
    const now = new Date()
    return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    )
}

const groupNotifications = (notifications: Notification[]) => {
    const today: Notification[] = []
    const earlier: Notification[] = []

    notifications.forEach((n) => {
        isToday(n.created_at) ? today.push(n) : earlier.push(n)
    })

    return { today, earlier }
}

const styles = StyleSheet.create({
    notificationContainer: {
        paddingVertical: 5,
        flexGrow: 1,
        backgroundColor: '#FFF'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#7B6F72',
        textAlign: 'center'
    },
    loadingWrapper: {
        alignItems: 'center',
        paddingVertical: 12
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFF'
    },
    footerButton: {
        backgroundColor: '#E4E6EB',
        height: 44,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16
    },
    footerButtonText: {
        color: '#050505',
        fontSize: 13,
        fontWeight: '500'
    }
})

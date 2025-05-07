import Loader from '@/components/Loader'
import { useCallback } from 'react'
import { View, RefreshControl, FlatList, Image, StyleSheet, Text } from 'react-native'
import NotificationCard from '../NotificationCard'
import { Notification } from '@/types/notification.type'
import LottieView from 'lottie-react-native'

interface Props {
    notifications: Notification[]
    onRefresh: () => void
    isFetching: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
    hasNextPage?: boolean
    onCardPress: (item: Notification) => void
    onMorePress: (item: Notification) => void
}

const NotificationList: React.FC<Props> = ({
    notifications,
    onRefresh,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    onCardPress,
    onMorePress
}) => {
    const renderNotificationItem = useCallback(
        ({ item }: { item: Notification }) => (
            <NotificationCard
                itemData={item}
                onBtnMorePress={() => onMorePress(item)}
                onCardPress={() => onCardPress(item)}
            />
        ),
        [onCardPress, onMorePress]
    )

    const renderFooter = useCallback(
        () =>
            isFetchingNextPage ? (
                <View style={styles.loadingWrapper}>
                    <Loader />
                </View>
            ) : null,
        [isFetchingNextPage]
    )

    const renderEmptyComponent = useCallback(
        () => (
            <View style={styles.emptyContainer}>
                <LottieView
                    source={require('@/assets/animations/empty_cart.json')}
                    autoPlay
                    loop
                    style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>You have no notifications</Text>
            </View>
        ),
        []
    )

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.notificationContainer}
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
export default NotificationList

const styles = StyleSheet.create({
    notificationContainer: {
        paddingVertical: 5,
        flexGrow: 1,
        backgroundColor: '#F7F8F8'
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
    }
})

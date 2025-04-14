import { useRef, useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'

import NavigationBar from '@/src/components/NavigationBar/NavigationBar'
import LoaderModal from '@/src/components/LoaderModal'
import Loader from '@/src/components/Loader'
import BottomSheetMoreInfo from './components/BottomSheetMoreInfo'
import NotificationCard from './components/NotificationCard/NotificationCard'

import { Notification, ResponseAPINotificationPage } from '@/src/types/notification.type'
import { notificationApi } from '@/src/services/rest'
import BottomSheet from '@gorhom/bottom-sheet'

function NotificationScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [selectedNotification, setSelectedNotification] = useState<Notification | undefined>()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, refetch } = useInfiniteQuery<
        ResponseAPINotificationPage,
        Error
    >({
        queryKey: ['notification'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await notificationApi.getNotification({
                params: { page: pageParam as number, limit: 10 }
            })
            return response.data
        },
        getNextPageParam: (lastPage) => {
            const { current_page, total_page } = lastPage.meta
            return current_page < total_page ? current_page + 1 : undefined
        },
        initialPageParam: 1,
        staleTime: 3 * 60 * 1000
    })

    const notifications = data?.pages.flatMap((page) => page.data) || []

    const handlePressMore = useCallback((item: Notification) => {
        setSelectedNotification(item)
        bottomSheetRef.current?.expand()
    }, [])

    const handleDeleteNotification = useCallback(() => {
        console.log('Delete notification')
    }, [])

    const renderNotificationItem = useCallback(
        ({ item }: { item: Notification }) => (
            <NotificationCard itemData={item} onBtnMorePress={() => handlePressMore(item)} />
        ),
        [handlePressMore]
    )

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have no notifications</Text>
        </View>
    )

    const renderFooter = () =>
        isFetchingNextPage ? (
            <View style={styles.loadingWrapper}>
                <Loader />
            </View>
        ) : null

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    return (
        <SafeAreaView style={styles.wrapperScreen}>
            <NavigationBar title='Notifications' />

            {isLoading ? (
                <LoaderModal title='Loading' />
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.notificationContainer}
                    ListEmptyComponent={renderEmptyComponent}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.2}
                    refreshControl={
                        <RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={refetch} />
                    }
                />
            )}

            <BottomSheetMoreInfo
                ref={bottomSheetRef}
                onDeleteNotification={handleDeleteNotification}
                notificationData={selectedNotification}
            />
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    wrapperScreen: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    notificationContainer: {
        marginTop: 30,
        flex: 1
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#7B6F72'
    },
    loadingWrapper: {
        alignItems: 'center',
        paddingVertical: 12
    }
})

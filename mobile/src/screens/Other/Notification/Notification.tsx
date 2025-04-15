import { useRef, useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

import NavigationBar from '@/src/components/NavigationBar/NavigationBar'
import LoaderModal from '@/src/components/LoaderModal'
import Loader from '@/src/components/Loader'
import BottomSheetMoreInfo from './components/BottomSheetMoreInfo'
import NotificationCard from './components/NotificationCard/NotificationCard'
import Toast from 'react-native-toast-message'

import { Notification, ResponseAPINotificationPage } from '@/src/types/notification.type'
import { notificationApi } from '@/src/services/rest'
import BottomSheet from '@gorhom/bottom-sheet'
import { RootStackScreenProps } from '@/src/navigation/types'

function NotificationScreen({ navigation }: RootStackScreenProps<'Notification'>) {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [selectedNotification, setSelectedNotification] = useState<Notification>()

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
        getNextPageParam: ({ meta }) => (meta.current_page < meta.total_page ? meta.current_page + 1 : undefined),
        initialPageParam: 1,
        staleTime: 3 * 60 * 1000
    })

    const notifications = data?.pages.flatMap((page) => page.data) || []

    const deleteNotifyMutation = useMutation({
        mutationFn: notificationApi.deleteNotification
    })

    const readNotifyMutation = useMutation({
        mutationFn: notificationApi.readNotification
    })

    const handlePressMore = useCallback((item: Notification) => {
        setSelectedNotification(item)
        bottomSheetRef.current?.expand()
    }, [])

    const handleCardNotificationPress = async (item: Notification) => {
        await readNotifyMutation.mutateAsync({ id: item.id })
        refetch()

        switch (item.type) {
            case 'activity':
                navigation.navigate('ActivityTracker')
                break
            case 'workout':
                navigation.navigate('WorkoutHistoryDetail', {
                    workout_id: item.metadata?.workout_id as string
                })
                break
            case 'exercise':
                navigation.navigate('CategoryDetail', {
                    category_id: item.metadata?.category_id as string,
                    exercise_id: item.metadata?.exercise_id
                })
                break
        }
    }

    const handleDeleteNotification = useCallback(async (id: string) => {
        await deleteNotifyMutation.mutateAsync(
            { id },
            {
                onSuccess: () => {
                    Toast.show({ type: 'success', text1: 'Notification deleted' })
                    refetch()
                },
                onError: () => {
                    Toast.show({ type: 'error', text1: 'Notification deletion failed.' })
                }
            }
        )
    }, [])

    const renderNotificationItem = useCallback(
        ({ item }: { item: Notification }) => (
            <NotificationCard
                itemData={item}
                onBtnMorePress={() => handlePressMore(item)}
                onCardPress={() => handleCardNotificationPress(item)}
            />
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
        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }

    return (
        <View style={styles.wrapperScreen}>
            <SafeAreaView style={styles.navBar}>
                <NavigationBar title='Notifications' callback={navigation.goBack} />
            </SafeAreaView>

            <View style={styles.content}>
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
                        onEndReachedThreshold={0.3}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={refetch} />
                        }
                    />
                )}
            </View>

            <BottomSheetMoreInfo
                ref={bottomSheetRef}
                onDeleteNotification={handleDeleteNotification}
                notificationData={selectedNotification}
            />
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    wrapperScreen: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navBar: {
        height: 90
    },
    content: {
        flex: 1
    },
    notificationContainer: {
        paddingBottom: 16
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

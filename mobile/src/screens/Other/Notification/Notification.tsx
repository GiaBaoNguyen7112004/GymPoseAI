import { useRef, useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, RefreshControl, Image } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

import NavigationBar from '@/components/NavigationBar/NavigationBar'
import LoaderModal from '@/components/LoaderModal'
import Loader from '@/components/Loader'
import NotificationCard from './components/NotificationCard/NotificationCard'
import BottomSheetMoreInfo from './components/BottomSheetMoreInfo'

import { notificationApi } from '@/services/rest'
import { showErrorAlert } from '@/utils/alert.util'
import showToast from '@/utils/toast.util'

import { Notification, ResponseAPINotificationPage } from '@/types/notification.type'
import { RootStackScreenProps } from '@/navigation/types'

function NotificationScreen({ navigation }: RootStackScreenProps<'Notification'>) {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [selectedNotification, setSelectedNotification] = useState<Notification>()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, refetch } = useInfiniteQuery<
        ResponseAPINotificationPage,
        Error
    >({
        queryKey: ['notification'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await notificationApi.getNotification({ params: { page: pageParam as number, limit: 10 } })
            return res.data
        },
        getNextPageParam: ({ meta }) => (meta.current_page < meta.total_page ? meta.current_page + 1 : undefined),
        initialPageParam: 1,
        staleTime: 3 * 60 * 1000
    })

    const notifications = data?.pages.flatMap((page) => page.data) || []

    const deleteNotifyMutation = useMutation({ mutationFn: notificationApi.deleteNotification })
    const readNotifyMutation = useMutation({ mutationFn: notificationApi.readNotification })

    const handlePressMore = useCallback((item: Notification) => {
        setSelectedNotification(item)
        bottomSheetRef.current?.expand()
    }, [])

    const handleCardNotificationPress = async (item: Notification) => {
        await readNotifyMutation.mutateAsync({ id: item.id })
        refetch()

        const { type, metadata } = item
        switch (type) {
            case 'activity':
                navigation.navigate('ActivityTracker')
                break
            case 'workout':
                navigation.navigate('WorkoutHistoryDetail', {
                    workout_id: metadata?.workout_id as string
                })
                break
            case 'exercise':
                navigation.navigate('CategoryDetail', {
                    category_id: metadata?.category_id as string,
                    exercise_id: metadata?.exercise_id
                })
                break
        }
    }

    const handleDeleteNotification = useCallback(async (id: string) => {
        await deleteNotifyMutation.mutateAsync(
            { id },
            {
                onSuccess: (res) => {
                    bottomSheetRef.current?.close()
                    showToast({ title: res.data.message })
                    refetch()
                },
                onError: () => showErrorAlert('default')
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
            <Image
                source={require('@/assets/images/notification.png')}
                style={styles.emptyImage}
                resizeMode='contain'
            />
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
            {isLoading && <LoaderModal title='Loading' />}
            <SafeAreaView style={styles.navBar}>
                <NavigationBar title='Notifications' callback={navigation.goBack} />
            </SafeAreaView>

            <View style={styles.content}>
                <BottomSheetMoreInfo
                    ref={bottomSheetRef}
                    onDeleteNotification={handleDeleteNotification}
                    notificationData={selectedNotification}
                />
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
            </View>
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
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    content: {
        flex: 1
    },
    notificationContainer: {
        paddingBottom: 16,
        flexGrow: 1
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

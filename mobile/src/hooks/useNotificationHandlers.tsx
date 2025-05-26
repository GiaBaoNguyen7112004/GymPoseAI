// hooks/useNotificationHandlers.ts
import { useCallback, Suspense } from 'react'
import { ActivityIndicator } from 'react-native'
import useBottomSheetController from '@/hooks/useBottomSheetController'
import useReadNotification from '@/hooks/useReadNotification'
import useReadAllNotifications from '@/hooks/useReadAllNotifications'
import useDeleteNotification from '@/hooks/useDeleteNotification'
import { showErrorAlert } from '@/utils/alert.util'
import showToast from '@/utils/toast.util'
import { Notification } from '@/types/notification.type'
import NotificationDetail from '@/screens/Main/Notification/components/NotificationDetail'
import MoreActionNavBar from '@/screens/Main/Notification/components/MoreActionNavBar'

export default function useNotificationHandlers(refetch: () => void) {
    const { openBottomSheet, closeBottomSheet, bottomSheetRef } = useBottomSheetController()
    const { handleReadNotification } = useReadNotification()
    const { markAllAsRead } = useReadAllNotifications()
    const { handleDeleteNotification } = useDeleteNotification({
        onSuccessCallback: (res) => {
            closeBottomSheet()
            showToast({ title: res.data.message })
            refetch()
        },
        onErrorCallback: () => showErrorAlert({ statusCode: 'default' })
    })

    const handleMarkAllAsRead = useCallback(() => {
        closeBottomSheet()
        markAllAsRead()
        setTimeout(() => {
            refetch()
        }, 500)
    }, [refetch])

    const handlePressNotificationCardMore = useCallback((item: Notification) => {
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <NotificationDetail notificationData={item} onDeleteNotification={handleDeleteNotification} />
            </Suspense>
        )
    }, [])

    const handlePressNavMore = useCallback(() => {
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <MoreActionNavBar handleMarkAllAsRead={handleMarkAllAsRead} />
            </Suspense>
        )
    }, [])

    const handleCardNotificationPress = useCallback(
        (item: Notification, navigation: any) => {
            handleReadNotification(item.id)
            refetch()

            const { type, metadata } = item
            switch (type) {
                case 'activity':
                    navigation.navigate('ActivityTracker')
                    break
                case 'workout':
                    navigation.navigate('WorkoutHistoryDetail', { workout_id: metadata?.workout_id })
                    break
                case 'exercise':
                    navigation.navigate('CategoryDetail', {
                        category_id: metadata?.category_id,
                        exercise_id: metadata?.exercise_id
                    })
                    break
            }
        },
        [refetch]
    )

    return {
        bottomSheetRef,
        handlePressNotificationCardMore,
        handlePressNavMore,
        handleCardNotificationPress
    }
}

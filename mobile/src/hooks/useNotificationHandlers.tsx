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
import { useNavigation } from '@react-navigation/native'

export default function useNotificationHandlers(refetch: () => void) {
    const navigation = useNavigation()
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
        (item: Notification) => {
            handleReadNotification(item.id)
            refetch()

            const { type, meta_data } = item
            switch (type) {
                case 'ACTIVITY':
                    navigation.navigate('ActivityTracker')
                    break
                case 'WORKOUT':
                    navigation.navigate('WorkoutSummaryDetail', { workout_id: meta_data?.workout_id as string })
                    break
                case 'EXERCISE':
                    navigation.navigate('CategoryDetail', {
                        category_id: meta_data?.category_id as string,
                        exercise_id: meta_data?.exercise_id
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

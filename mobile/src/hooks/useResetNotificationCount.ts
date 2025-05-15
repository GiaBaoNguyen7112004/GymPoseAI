import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationApi } from '@/services/rest'
import { useCallback } from 'react'

export function useResetNotificationCountOnFocus() {
    const queryClient = useQueryClient()

    const { mutate: resetNotificationCount } = useMutation({
        mutationFn: notificationApi.resetNewNotificationCount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['new-notification'] })
        }
    })

    useFocusEffect(
        useCallback(() => {
            resetNotificationCount()
        }, [])
    )
}

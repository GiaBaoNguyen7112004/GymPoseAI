// hooks/useReadNotification.ts
import { useMutation } from '@tanstack/react-query'
import { notificationApi } from '@/services/rest'
import { useCallback } from 'react'

const useReadNotification = () => {
    const mutation = useMutation({
        mutationFn: notificationApi.readNotification
    })

    const handleReadNotification = useCallback(async (id: string) => {
        await mutation.mutateAsync({ id })
    }, [])

    return { handleReadNotification, isReading: mutation.isPending }
}

export default useReadNotification

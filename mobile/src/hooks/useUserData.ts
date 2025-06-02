import { useContext, useEffect, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppContext } from '@/Contexts/App.context'
import { userApi } from '@/services/rest'
import storage from '@/utils/StorageManager.util'

function useUserData() {
    const { isAuthenticated, setProfile, profile } = useContext(AppContext)
    const queryClient = useQueryClient()

    const fetchProfile = useCallback(async () => {
        const res = await userApi.getProfile()
        const user = res.data.data
        setProfile(user)
        return user
    }, [setProfile])

    // Clear user data when logging out
    useEffect(() => {
        if (!isAuthenticated) {
            queryClient.removeQueries({ queryKey: ['user'], exact: true })
            storage.clearStorage()
            setProfile(null)
        }
    }, [isAuthenticated, queryClient, setProfile])
    console.log()
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['user'],
        queryFn: fetchProfile,
        enabled: isAuthenticated,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        refetchOnWindowFocus: false
    })

    const userData = isLoading && profile ? profile : data

    return {
        userData,
        isLoading,
        ...rest
    }
}

export default useUserData

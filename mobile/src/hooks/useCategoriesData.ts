import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@/services/rest'

export function useCategories() {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['categories'],
        queryFn: categoriesApi.getCategories,
        staleTime: 1000 * 60 * 10
    })

    const categoriesData = data?.data?.data || []

    return { categoriesData, categoriesLoading: isLoading, ...rest }
}

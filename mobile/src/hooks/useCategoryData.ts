import { categoriesApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'

interface useCategoryDataProps {
    category_id: string
}

function useCategoryData({ category_id }: useCategoryDataProps) {
    const { data: categoryRes, ...rest } = useQuery({
        queryKey: ['category', category_id],
        queryFn: () => categoriesApi.getCategoriesById({ id: category_id }),
        enabled: !!category_id
    })

    const category = categoryRes?.data.data
    return {
        category,
        ...rest
    }
}

export default useCategoryData

import { ResponseApi } from '@/types/utils.type'
import { Category } from '@/types/exercises.type'
import http from '@/services/core/http'

const categoriesApi = {
    getCategories() {
        return http.get<ResponseApi<Category[], any>>(process.env.EXPO_PUBLIC_URL_CATEGORIES)
    },
    getCategoriesById({ id }: { id: string }) {
        return http.get<ResponseApi<Category, any>>(`${process.env.EXPO_PUBLIC_URL_CATEGORIES}/${id}`)
    }
}

export default categoriesApi

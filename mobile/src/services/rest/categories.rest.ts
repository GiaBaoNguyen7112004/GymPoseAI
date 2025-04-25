import { ResponseApi } from '@/types/utils.type'
import http from '../core/httpClient'
import { Category } from '@/types/exercises.type'

const categoriesApi = {
    getCategories() {
        return http.get<ResponseApi<Category[], any>>(process.env.EXPO_PUBLIC_URL_CATEGORIES)
    },
    getCategoriesById({ id }: { id: string }) {
        return http.get<ResponseApi<Category, any>>(`${process.env.EXPO_PUBLIC_URL_CATEGORIES}/${id}`)
    }
}

export default categoriesApi

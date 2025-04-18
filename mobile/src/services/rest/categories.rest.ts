import { ResponseApi } from '@/types/utils.type'
import http from '../core/httpClient'
import { Category } from '@/types/exercises.type'
import { URL_CATEGORIES } from '@env'

const categoriesApi = {
    getCategories() {
        return http.get<ResponseApi<Category[], any>>(URL_CATEGORIES)
    },
    getCategoriesById({ id }: { id: string }) {
        return http.get<ResponseApi<Category, any>>(`${URL_CATEGORIES}/${id}`)
    }
}

export default categoriesApi

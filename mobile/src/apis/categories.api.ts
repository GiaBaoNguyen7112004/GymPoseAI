import { ResponseApi } from '../types/utils.type'
import { URL_CATEGORIES } from '@env'
import http from '../utils/https.util'
import { Category } from '../types/exercises.type'

const categoriesApi = {
    getCategories() {
        return http.get<ResponseApi<Category[], any>>(URL_CATEGORIES)
    },
    getCategoriesById({ id }: { id: string }) {
        return http.get<ResponseApi<Category, any>>(`${URL_CATEGORIES}/${id}`)
    }
}

export default categoriesApi

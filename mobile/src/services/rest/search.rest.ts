import http from '@/services/core/http'
import { ResponseApiSearch, SearchParams } from '@/types/search.type'

const searchApi = {
    search(params: SearchParams) {
        return http.get<ResponseApiSearch>(`${process.env.EXPO_PUBLIC_URL_SEARCH}`, { params })
    }
}

export default searchApi

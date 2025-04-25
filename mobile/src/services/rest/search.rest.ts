import http from '../core/httpClient'
import { ResponseApiSearch, SearchParams } from '@/types/search.type'

const searchApi = {
    search({ params }: { params: SearchParams }) {
        return http.get<ResponseApiSearch>(`${process.env.EXPO_PUBLIC_URL_SEARCH}`, {
            params
        })
    }
}

export default searchApi

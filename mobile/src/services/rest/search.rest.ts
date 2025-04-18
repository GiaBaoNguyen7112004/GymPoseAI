import http from '../core/httpClient'
import { URL_SEARCH } from '@env'
import { ResponseApiSearch, SearchParams } from '@/types/search.type'

const searchApi = {
    search({ params }: { params: SearchParams }) {
        return http.get<ResponseApiSearch>(`${URL_SEARCH}`, {
            params
        })
    }
}

export default searchApi

import http from '@/src/services/core/httpClient'
import { URL_TARGETS } from '@env'
import { ResponseApi } from '@/src/types/utils.type'
import { CaloriesTargetOfDay } from '@/src/types/target.type'

const targetApi = {
    getTargetOfDate({ id }: { id: string }) {
        return http.get<ResponseApi<CaloriesTargetOfDay, null>>(`${URL_TARGETS}/calories/${id}`)
    }
}

export default targetApi

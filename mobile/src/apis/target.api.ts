import http from '@/src/utils/https.util'
import { URL_TARGETS } from '@env'
import { ResponseApi } from '../types/utils.type'
import { CaloriesTargetOfDay } from '../types/target.type'

const targetApi = {
    getTargetOfDate({ id }: { id: string }) {
        return http.get<ResponseApi<CaloriesTargetOfDay, null>>(`${URL_TARGETS}/calories/${id}`)
    }
}

export default targetApi

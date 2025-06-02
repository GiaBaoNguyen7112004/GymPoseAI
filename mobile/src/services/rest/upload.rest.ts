import { ResponseApi } from '@/types/utils.type'
import http from '@/services/core/http'

const uploadApi = {
    uploadImage(body: FormData) {
        return http.post<ResponseApi<string, any>>(process.env.EXPO_PUBLIC_URL_UPLOAD_IMAGE, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default uploadApi

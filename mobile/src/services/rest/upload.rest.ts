import { ResponseApi } from '@/types/utils.type'
import http from '@/services/core/http'
import { UploadImageResData } from '@/types/upload.type'

const uploadApi = {
    uploadImage(body: FormData) {
        return http.post<ResponseApi<UploadImageResData, any>>(process.env.EXPO_PUBLIC_URL_UPLOAD_IMAGE, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default uploadApi

import { ResponseApi } from '@/types/utils.type'
import http from '../core/httpClient'
import { URL_UPLOAD_IMAGE } from '@env'
import { UploadImageResData } from '@/types/upload.type'

const uploadApi = {
    uploadImage(body: FormData) {
        return http.post<ResponseApi<UploadImageResData, any>>(URL_UPLOAD_IMAGE, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default uploadApi

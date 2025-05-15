import { Path, UseFormSetError } from 'react-hook-form'
import { ResponseApi } from '@/types/utils.type'
import { FieldValues } from 'react-hook-form'
import { showErrorAlert } from './alert.util'
import {
    isAxiosUnauthorizedError,
    isAxiosUnprocessableEntityError,
    isAxiosBadRequestError,
    isAxiosForbiddenError,
    isAxiosNotFoundError,
    isAxiosInternalServerError
} from './axiosError.utils'

export default function handleFormError<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
    if (isAxiosUnprocessableEntityError<ResponseApi<T, any>>(error)) {
        const formError = error.response?.data.errors
        if (formError != undefined) {
            formError.forEach((element) => {
                const key = element.field as keyof T
                setError(key as Path<T>, {
                    message: element.message,
                    type: 'Server'
                })
            })
        }
    } else if (isAxiosUnauthorizedError(error)) {
        showErrorAlert(401)
    } else if (isAxiosBadRequestError(error)) {
        showErrorAlert(400)
    } else if (isAxiosForbiddenError(error)) {
        showErrorAlert(403)
    } else if (isAxiosNotFoundError(error)) {
        showErrorAlert(404)
    } else if (isAxiosInternalServerError(error)) {
        showErrorAlert(500)
    } else {
        showErrorAlert('default')
    }
}

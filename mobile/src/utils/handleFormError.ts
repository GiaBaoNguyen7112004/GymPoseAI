import { Path, UseFormSetError } from 'react-hook-form'
import { ErrorField, ResponseApi } from '@/types/utils.type'
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

/**
 * Handles server-side API errors and maps them to form field errors (if applicable),
 * or displays appropriate error alerts based on the HTTP status code.
 *
 * - For 422 Unprocessable Entity errors, it will map field-specific errors using `setError`.
 * - For 400, 401, 403, 404, and 500 errors, it will display a generic alert message.
 * - For unknown errors, it will display a default alert.
 *
 * @template T - The form field values type from `react-hook-form`.
 * @param error - The error object thrown, typically from an Axios request.
 * @param setError - The `react-hook-form` function used to assign validation errors to form fields.
 */
export default function handleFormError<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
    const response = (error as any)?.response
    const message = response?.data?.message ?? ''

    if (isAxiosUnprocessableEntityError<ResponseApi<T, any>>(error)) {
        const formErrors = response?.data?.errors as ErrorField[]
        formErrors?.forEach((e) => {
            const key = e.field as keyof T
            setError(key as Path<T>, {
                message: e.message,
                type: 'Server'
            })
        })
        return
    }

    const errorHandlers: { [status: number]: () => void } = {
        400: () => showErrorAlert({ statusCode: 400, message }),
        401: () => showErrorAlert({ statusCode: 401, message }),
        403: () => showErrorAlert({ statusCode: 403, message }),
        404: () => showErrorAlert({ statusCode: 404, message }),
        500: () => showErrorAlert({ statusCode: 500, message })
    }

    if (isAxiosUnauthorizedError(error)) return errorHandlers[401]()
    if (isAxiosBadRequestError(error)) return errorHandlers[400]()
    if (isAxiosForbiddenError(error)) return errorHandlers[403]()
    if (isAxiosNotFoundError(error)) return errorHandlers[404]()
    if (isAxiosInternalServerError(error)) return errorHandlers[500]()

    showErrorAlert({ statusCode: 'default' })
}

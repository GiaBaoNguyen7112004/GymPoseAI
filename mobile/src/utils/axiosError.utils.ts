import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosInternalServerError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.InternalServerError
}

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosForbiddenError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.Forbidden
}

export function isAxiosNotFoundError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.NotFound
}

export function isAxiosMethodNotAllowedError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.MethodNotAllowed
}

export function isAxiosServiceUnavailableError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.ServiceUnavailable
}

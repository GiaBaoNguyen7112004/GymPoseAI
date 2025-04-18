export const errorMessages = {
    400: {
        title: 'Bad Request',
        message: 'The data sent is invalid. Please check and try again.'
    },
    401: {
        title: 'Unauthorized',
        message: 'Your session has expired. Please log in again.'
    },
    403: {
        title: 'Forbidden',
        message: 'You do not have permission to perform this action.'
    },
    404: {
        title: 'Not Found',
        message: 'The content you are looking for does not exist or has been removed.'
    },
    500: {
        title: 'Server Error',
        message: 'The system encountered an issue. Please try again later.'
    },
    default: {
        title: 'Unknown Error',
        message: 'An unexpected error occurred. Please try again.'
    }
}

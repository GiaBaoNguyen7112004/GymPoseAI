export const handleErrorWrapper = (setError: (msg: string | null) => void) => {
    return (err: unknown, fallbackMessage: string): string => {
        const errorMessage = err instanceof Error ? err.message : fallbackMessage
        setError(errorMessage)
        return errorMessage
    }
}

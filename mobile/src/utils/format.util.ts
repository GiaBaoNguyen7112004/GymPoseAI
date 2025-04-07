export const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' })

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }
    return date.toLocaleDateString('en-US', options)
}

export const formatTime = (timestamp: number): string => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    if (diffInSeconds < 60) return `Just now`
    if (diffInSeconds < 3600) return `About ${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `About ${Math.floor(diffInSeconds / 3600)} hours ago`

    return past.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}
export const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' })

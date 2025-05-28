import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const numberFormatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short'
})

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    }
    return date.toLocaleDateString('en-US', options)
}

export const formatRelativeTimeFromNow = (isoString: string): string => {
    const now = dayjs().tz('Asia/Ho_Chi_Minh')
    const date = dayjs(isoString).tz('Asia/Ho_Chi_Minh')
    return `About ${now.to(date)}`
}

export const formatTimeFromSeconds = (seconds?: number): string => {
    if (seconds === undefined || seconds == -1) return '_ _ : _ _ '
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    const paddedMins = mins.toString().padStart(2, '0')
    const paddedSecs = secs.toString().padStart(2, '0')
    return `${paddedMins}:${paddedSecs}`
}

export const formatTimeFromMinutes = (minutes?: number): string => {
    if (minutes === undefined) return '_ _'
    const mins = Math.floor(minutes)
    const secs = Math.round((minutes - mins) * 60)

    const paddedMins = mins.toString().padStart(2, '0')
    const paddedSecs = secs.toString().padStart(2, '0')

    return `${paddedMins}:${paddedSecs}`
}

/**
 * Formats an ISO date string or datetime string into a readable date and time format.
 * Example output: "01/07/2023 at 17:59"
 *
 * @param isoDateString - The ISO date string or datetime string to format (can be undefined)
 * @returns Formatted date and time string, or "_ _" if input is invalid or undefined
 */
export const formatReadableDateTime = (isoDateString: string | undefined): string => {
    if (!isoDateString) return '_ _'
    const fixedIso = isoDateString.replace(' ', 'T')
    const date = new Date(fixedIso)

    const datePart = date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    const timePart = date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

    return `${datePart} at ${timePart}`
}

/**
 * Formats an ISO time string into a time string with hours, minutes, and seconds.
 * Example output: "17:59:08"
 *
 * @param isoTimeString - The ISO time string to format
 * @returns Formatted time string in HH:mm:ss format
 */
export const formatTimeWithSeconds = (isoTimeString: string): string => {
    const date = new Date(isoTimeString)

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
}

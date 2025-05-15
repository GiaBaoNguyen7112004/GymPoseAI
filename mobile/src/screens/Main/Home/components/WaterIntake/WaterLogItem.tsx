import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextGradient from '@/components/TextGradient'
import MyIcon from '@/components/Icon'
import { waterLogIntake } from '@/hooks/useWaterIntakeData'

interface Props {
    item: waterLogIntake
    isLast: boolean
}

const WaterLogItem: React.FC<Props> = ({ item, isLast }) => {
    const isActive = isCurrentTimeSlot(item.start, item.end)

    return (
        <View style={styles.item}>
            <View style={styles.timeline}>
                <MyIcon name={'dotGradient'} size={8} />
                {!isLast && <MyIcon name='line28Icon' size={24} width={1} style={styles.line} />}
            </View>
            <View>
                <Text style={[styles.time, isActive && styles.activeItem]}>{item.time}</Text>
                <TextGradient textStyle={styles.value} text={`${item.value} ml`} colors={['#C58BF2', '#EEA4CE']} />
            </View>
        </View>
    )
}

export default memo(WaterLogItem)

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'flex-start',
        paddingRight: 20
    },
    timeline: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeItem: {
        color: '#C58BF2',
        fontWeight: '600'
    },
    line: {
        marginVertical: 5
    },
    time: {
        fontSize: 8,
        color: '#ADA4A5',
        fontWeight: '400',
        lineHeight: 12,
        marginTop: -2
    },
    value: {
        fontSize: 8,
        color: '#ADA4A5',
        fontWeight: '500',
        lineHeight: 12,
        marginTop: 3
    }
})

/**
 * Checks whether the current time falls within the given time slot.
 *
 * @param {string} start - Start time in 'HH:mm' format (e.g., '08:30').
 * @param {string} end - End time in 'HH:mm' format (e.g., '10:00').
 * @returns {boolean} - Returns true if the current time is within the range [start, end], otherwise false.
 *
 * @example
 * isCurrentTimeSlot("08:00", "10:00") // true if the current time is between 08:00 and 10:00
 */

export const isCurrentTimeSlot = (start: string, end: string): boolean => {
    const now = new Date()
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    const startMinutes = startHour * 60 + startMinute
    const endMinutes = endHour * 60 + endMinute
    const currentMinutes = currentHour * 60 + currentMinute

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes
}

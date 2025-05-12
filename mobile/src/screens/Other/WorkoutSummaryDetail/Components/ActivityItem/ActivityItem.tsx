import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ActivityItemProps {
    label: string
    value: string
    unit: string
    color: string
}

function ActivityItem({ label, value, unit, color }: ActivityItemProps) {
    return (
        <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>{label}</Text>
            <Text style={[styles.activityValue, { color }]}>
                {value}
                <Text style={styles.activityUnit}> {unit}</Text>
            </Text>
        </View>
    )
}

export default memo(ActivityItem)

const styles = StyleSheet.create({
    activityItem: { marginBottom: 8 },
    activityLabel: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72',
        marginBottom: 3
    },
    activityValue: {
        fontSize: 15,
        fontWeight: '600'
    },
    activityUnit: {}
})

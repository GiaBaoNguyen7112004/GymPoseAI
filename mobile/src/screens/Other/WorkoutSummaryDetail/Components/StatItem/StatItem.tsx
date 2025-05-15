import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface StatItemProps {
    label: string
    value: number | string
}

function StatItem({ label, value }: StatItemProps) {
    return (
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    )
}

export default memo(StatItem)

const styles = StyleSheet.create({
    statItem: { flex: 1 },
    statLabel: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72',
        marginBottom: 4,
        textAlign: 'center'
    },
    statValue: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        textAlign: 'center'
    }
})

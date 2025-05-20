import { memo, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { pose_error } from '@/types/workoutHistory.type'
import { formatTimeWithSeconds } from '@/utils/format.util'

interface RowProps {
    error: pose_error
    index: number
    isSelected: boolean
    onPress: (error: pose_error, index: number) => void
}

function TableRow({ error, index, isSelected, onPress }: RowProps) {
    const handlePress = useCallback(() => onPress(error, index), [error, index, onPress])

    return (
        <Pressable style={[styles.row, isSelected && styles.rowSelected]} onPress={handlePress}>
            <View style={styles.iconContainer}>
                {isSelected && <AntDesign name='caretright' size={12} color='#22C55E' />}
            </View>
            <Text style={[styles.text, styles.cell80]}>{index + 1}</Text>
            <Text style={[styles.text, styles.cell200]} numberOfLines={1}>
                {error.ai_result}
            </Text>
            <Text style={[styles.text, styles.cell90]}>{formatTimeWithSeconds(error.created_at)}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 6
    },
    rowSelected: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)'
    },
    iconContainer: {
        width: 40,
        alignItems: 'center'
    },
    text: {
        fontWeight: '400'
    },
    cell80: {
        width: 50
    },
    cell90: {
        width: 90
    },
    cell200: {
        width: 200
    }
})

export default memo(TableRow)

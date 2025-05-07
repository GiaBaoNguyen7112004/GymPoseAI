import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface SortButtonProps {
    order: 'asc' | 'desc'
    onOrderChange: () => void
}

const SortButton = ({ order, onOrderChange }: SortButtonProps) => (
    <TouchableOpacity style={styles.sortButton} onPress={onOrderChange}>
        <Text style={styles.sortText}>Sort</Text>
        <Ionicons name={order === 'asc' ? 'chevron-up' : 'chevron-down'} size={16} color='#93A7FE' />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    sortText: {
        color: '#4b5563'
    }
})

export default memo(SortButton)

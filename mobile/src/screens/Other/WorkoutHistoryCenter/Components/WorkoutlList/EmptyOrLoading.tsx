import WorkoutCardSkeleton from '@/components/TrainingSessionCardSkeleton'
import { Ionicons } from '@expo/vector-icons'
import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
    isLoading: boolean
}

const EmptyOrLoading: React.FC<Props> = ({ isLoading }) => {
    if (isLoading) {
        return Array.from({ length: 5 }, (_, index) => (
            <View style={{ paddingHorizontal: 10 }} key={index}>
                <WorkoutCardSkeleton />
            </View>
        ))
    }

    return (
        <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
                <Ionicons name='close' size={40} color='#ddd' />
            </View>
            <Text style={styles.emptyStateText}>No history data .</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    emptyStateText: {
        color: '#999',
        fontSize: 13
    },
    loadingText: {
        color: '#999',
        fontSize: 16,
        textAlign: 'center',
        padding: 20
    },
    emptyStateIcon: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    }
})

export default memo(EmptyOrLoading)

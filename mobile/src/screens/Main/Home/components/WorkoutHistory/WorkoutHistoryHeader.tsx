import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    onPressSeeMore: () => void
}
function WorkoutHistoryHeader({ onPressSeeMore }: Props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Latest Workout</Text>
            <TouchableOpacity onPress={onPressSeeMore}>
                <Text style={styles.subtitleGray}>See more</Text>
            </TouchableOpacity>
        </View>
    )
}
export default memo(WorkoutHistoryHeader)
const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    subtitleGray: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#ADA4A5'
    },
    header: {
        marginTop: 33,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

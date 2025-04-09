import { Exercise } from '@/src/types/exercises.type'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

interface WorkoutCardProps {
    itemData: Exercise
    onPress: () => void
}

function WorkoutCard({ itemData, onPress }: WorkoutCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <Image source={{ uri: itemData.thumbnail_url }} style={styles.image} resizeMode='cover' />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{itemData.name}</Text>
                    <Text style={styles.duration}>{itemData.duration_minutes} minutes</Text>
                </View>
            </View>

            <View style={styles.arrowContainer}>
                <View style={styles.arrowCircle}>
                    <Ionicons name='chevron-forward' size={8} color='#ADA4A5' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default WorkoutCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 7.5
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12
    },
    textContainer: {
        marginLeft: 10
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1D1617',
        marginBottom: 5
    },
    duration: {
        fontSize: 12,
        color: '#7B6F72',
        fontWeight: '500'
    },
    arrowContainer: {
        padding: 8
    },
    arrowCircle: {
        width: 18.5,
        height: 18.5,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#ADA4A5',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

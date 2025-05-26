import { Exercise } from '@/types/exercises.type'
import { Ionicons } from '@expo/vector-icons'
import { Skeleton } from 'moti/skeleton'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native'

interface WorkoutCardProps {
    itemData: Exercise
    onPress: () => void
    isHighlighted?: boolean
    containerStyle?: StyleProp<ViewStyle>
}

function WorkoutCard({ itemData, onPress, isHighlighted, containerStyle }: WorkoutCardProps) {
    const scaleValue = useRef(new Animated.Value(1)).current
    const bgAnimValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (isHighlighted) {
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scaleValue, {
                        toValue: 1.05,
                        duration: 250,
                        useNativeDriver: true
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 250,
                        useNativeDriver: true
                    })
                ]),
                Animated.sequence([
                    Animated.timing(bgAnimValue, {
                        toValue: 1,
                        duration: 250,
                        useNativeDriver: false
                    }),
                    Animated.delay(250),
                    Animated.timing(bgAnimValue, {
                        toValue: 0,
                        duration: 250,
                        useNativeDriver: false
                    })
                ])
            ]).start()
        }
    }, [isHighlighted])

    const backgroundColor = useMemo(
        () =>
            bgAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#FFFFFF', '#E0F7FA']
            }),
        []
    )

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable onPress={onPress}>
                <Animated.View style={[styles.container, { backgroundColor }, containerStyle]}>
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
                </Animated.View>
            </Pressable>
        </Animated.View>
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
        borderRadius: 12,
        backgroundColor: '#92A3FD'
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

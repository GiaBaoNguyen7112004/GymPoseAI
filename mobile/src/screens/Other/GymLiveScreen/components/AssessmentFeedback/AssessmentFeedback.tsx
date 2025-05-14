import React from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { BlurView } from 'expo-blur'

type Props = {
    assessmentResult: string
    fadeAnim: Animated.Value
    slideAnim: Animated.Value
    blurIntensity?: number
}

const AssessmentFeedback = ({ assessmentResult, fadeAnim, slideAnim, blurIntensity = 85 }: Props) => {
    const isPositive =
        assessmentResult.toLowerCase().includes('perfect') || assessmentResult.toLowerCase().includes('good')

    const highlightColor = isPositive ? '#4ADE80' : '#F87171'

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}
        >
            <BlurView intensity={blurIntensity} tint='dark' style={styles.container}>
                <Text style={styles.text}>
                    AI Feedback:
                    <Text style={[styles.highlight, { color: highlightColor }]}> {assessmentResult}</Text>
                </Text>
            </BlurView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20
    },
    container: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    text: {
        color: '#F1F5F9',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 24
    },
    highlight: {
        fontWeight: 'bold'
    }
})

export default AssessmentFeedback

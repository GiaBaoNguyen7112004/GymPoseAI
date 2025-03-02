import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface progressBarParams {
    progress: number
    barHeight?: number
    barWidth?: number
    colors?: [string, string, ...string[]]
    style?: StyleProp<ViewStyle>
    [key: string]: any
}

const ProgressBar = ({
    progress,
    barHeight = 275,
    barWidth = 20,
    colors = ['#92A3FD', '#9DCEFF'],
    style
}: progressBarParams) => {
    const fillHeight = progress * barHeight

    return (
        <View style={[styles.progressBar, { width: barWidth, height: barHeight }, style]}>
            <LinearGradient
                style={[styles.fillTrack, { height: fillHeight }]}
                colors={colors}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 0.2, y: 1 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        borderRadius: 30,
        backgroundColor: '#F7F8F8',
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    fillTrack: {
        width: '100%'
    }
})

export default ProgressBar

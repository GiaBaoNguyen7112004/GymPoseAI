import React, { memo } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface ProgressBarParams {
    progress: number
    barHeight?: number
    barWidth?: number
    colors?: [string, string, ...string[]]
    style?: StyleProp<ViewStyle>
    orientation?: 'vertical' | 'horizontal'
    [key: string]: any
}

const ProgressBar = ({
    progress,
    barHeight = 275,
    barWidth = 20,
    colors = ['#92A3FD', '#9DCEFF'],
    orientation = 'vertical',
    style
}: ProgressBarParams) => {
    const fillSize = progress * barHeight

    const fillTrackStyle = {
        [orientation === 'vertical' ? 'height' : 'width']: fillSize,
        [orientation === 'vertical' ? 'width' : 'height']: '100%'
    }

    const gradientProps =
        orientation === 'vertical'
            ? { start: { x: 0.4, y: 0 }, end: { x: 0.2, y: 1 } }
            : { start: { x: 0, y: 0.4 }, end: { x: 1, y: 0.2 } }

    return (
        <View
            style={[
                styles.progressBar,
                {
                    width: orientation === 'vertical' ? barWidth : barHeight,
                    height: orientation === 'vertical' ? barHeight : barWidth
                },
                style
            ]}
        >
            <LinearGradient style={[styles.fillTrack, fillTrackStyle]} colors={colors} {...gradientProps} />
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
    fillTrack: {}
})

export default memo(ProgressBar)

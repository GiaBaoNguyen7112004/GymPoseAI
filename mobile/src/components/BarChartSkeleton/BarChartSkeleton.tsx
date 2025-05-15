import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const NUM_BARS = 7
const CHART_HEIGHT = 150
const BAR_WIDTH = 28
const LABEL_HEIGHT = 15
const LABEL_WIDTH = 35
const relativeHeights = [0.3, 0.8, 0.5, 0.7, 0.95, 0.35, 0.85]

const BarChartSkeleton = ({ show = true }: { show?: boolean }) => {
    const skeletonColorMode = 'light'

    const renderBars = () => {
        return relativeHeights.map((height, index) => (
            <View key={`bar-${index}`} style={styles.barWrapper}>
                <Skeleton height={height * CHART_HEIGHT} width={BAR_WIDTH} radius={8} colorMode={skeletonColorMode} />
            </View>
        ))
    }

    const renderLabels = () => {
        return Array.from({ length: NUM_BARS }).map((_, index) => (
            <View key={`label-${index}`} style={styles.labelWrapper}>
                <Skeleton height={LABEL_HEIGHT} width={LABEL_WIDTH} radius={4} colorMode={skeletonColorMode} />
            </View>
        ))
    }

    return (
        <View style={styles.container}>
            <Skeleton.Group show={show}>
                <View style={styles.barsContainer}>{renderBars()}</View>
                <View style={styles.labelsContainer}>{renderLabels()}</View>
            </Skeleton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        alignItems: 'center',
        height: 170
    },
    barsContainer: {
        flexDirection: 'row',
        height: CHART_HEIGHT,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 5
    },
    barWrapper: {
        alignItems: 'center'
    },
    labelsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    labelWrapper: {
        alignItems: 'center'
    }
})

export default memo(BarChartSkeleton)

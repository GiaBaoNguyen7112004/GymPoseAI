import React, { memo } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const chartContainerWidth = Dimensions.get('window').width - 32
const NUM_X_LABELS = 7
const NUM_Y_LABELS = 6

const LineChartSkeleton = ({ show = true }: { show?: boolean }) => {
    const markerTops = [120, 80, 100, 60, 90, 50, 75]

    return (
        <View style={styles.container}>
            <Skeleton.Group show={show}>
                <View style={styles.chartArea}>
                    <View style={styles.yAxisContainer}>
                        {Array.from({ length: NUM_Y_LABELS }).map((_, index) => (
                            <Skeleton key={`y-label-${index}`} width={30} height={10} radius={4} colorMode='light' />
                        ))}
                    </View>

                    <View style={styles.gridAndMarkersArea}>
                        {Array.from({ length: NUM_Y_LABELS - 1 }).map((_, index) => (
                            <Skeleton key={`grid-${index}`} width='100%' height={1} colorMode='light' />
                        ))}

                        {markerTops.map((top, index) => (
                            <View
                                key={`marker-${index}`}
                                style={[
                                    styles.markerBase,
                                    {
                                        left: `${(index / (NUM_X_LABELS - 1)) * 95}%`,
                                        top: top
                                    }
                                ]}
                            >
                                <Skeleton width={10} height={10} radius={5} colorMode='light' />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.xAxisContainer}>
                    {Array.from({ length: NUM_X_LABELS }).map((_, index) => (
                        <Skeleton key={`x-label-${index}`} width={35} height={15} radius={4} colorMode='light' />
                    ))}
                </View>
            </Skeleton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 170
    },
    chartArea: {
        height: 165,
        flexDirection: 'row',
        width: chartContainerWidth,

        marginBottom: 10
    },
    yAxisContainer: {
        width: 40,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5
    },
    gridAndMarkersArea: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        position: 'relative',
        paddingVertical: 5
    },
    markerBase: {
        position: 'absolute'
    },
    xAxisContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: chartContainerWidth * 0.9,
        paddingLeft: 40
    }
})

export default memo(LineChartSkeleton)

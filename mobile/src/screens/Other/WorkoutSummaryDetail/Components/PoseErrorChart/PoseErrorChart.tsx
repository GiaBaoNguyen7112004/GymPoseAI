import React, { memo } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { pose_error } from '@/types/workoutHistory.type'
import { transformPoseErrors } from '@/utils/chart.util'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export interface pose_error_Data {
    label: string
    count: string
    percent: number
}

interface PoseErrorChartProps {
    poseErrors: pose_error[]
}

const getBarColorBySeverity = (percentage: number): string => {
    if (percentage <= 25) {
        // Low error rate
        return '#3DCC91' // Green - Good
    } else if (percentage <= 50) {
        // Moderate error rate
        return '#FFD166' // Yellow - Caution
    } else if (percentage <= 75) {
        // High error rate
        return '#FF9F43' // Orange - Warning
    } else {
        // Very high error rate
        return '#FF6B6B' // Red - Critical
    }
}

function PoseErrorChart({ poseErrors }: PoseErrorChartProps) {
    const data: pose_error_Data[] = transformPoseErrors(poseErrors)

    return (
        <View style={styles.wrapper}>
            <View style={styles.headingWrapper}>
                <View style={styles.headerGroupLeft}>
                    <View style={styles.iconWrapper}>
                        <MaterialCommunityIcons name='google-analytics' size={16} color='blue' />
                    </View>
                    <Text style={styles.detailsTitle}>Pose Error Analysis</Text>
                </View>
            </View>

            <View style={styles.chartContent}>
                {data.map((errorItem, index) => {
                    const percentage = Math.round(errorItem.percent)
                    const barColor = getBarColorBySeverity(percentage)

                    return (
                        <View key={index} style={styles.errorItemContainer}>
                            <View style={styles.errorItemHeader}>
                                <Text style={styles.errorName} numberOfLines={1} ellipsizeMode='tail'>
                                    {errorItem.label}
                                </Text>
                                <View style={styles.errorStats}>
                                    <Text style={styles.errorPercentage}>{`${percentage}%`}</Text>
                                    <Text style={styles.errorCount}>{`${errorItem.count} times`}</Text>
                                </View>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        {
                                            width: `${percentage}%`,
                                            backgroundColor: barColor
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        marginHorizontal: 16,
        borderRadius: 6,
        paddingTop: 15,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        paddingHorizontal: 16
    },
    headingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerGroupLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#F7F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    detailsTitle: {
        fontSize: 15,
        fontWeight: '500'
    },
    chartContent: {
        borderTopWidth: 0.6,
        borderColor: '#E5E7EB',
        paddingTop: 5
    },
    errorItemContainer: {
        marginBottom: 20
    },
    errorItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    errorName: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1D1617',
        flex: 1,
        marginRight: 8
    },
    errorStats: {
        alignItems: 'flex-end'
    },
    errorPercentage: {
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
        color: '#2D3748'
    },
    errorCount: {
        fontSize: 10,
        color: '#718096',
        marginTop: 2
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#E2E8F0',
        borderRadius: 5,
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%',
        borderRadius: 5
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16
    },
    noDataText: {
        fontSize: 15,
        color: '#718096',
        textAlign: 'center'
    }
})

export default memo(PoseErrorChart)

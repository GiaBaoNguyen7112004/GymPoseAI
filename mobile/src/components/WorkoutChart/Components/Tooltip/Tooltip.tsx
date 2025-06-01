// Tooltip.tsx
import { ViewModeType } from '@/types/utils.type'
import { memo, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export type TooltipDataType = {
    visible: boolean
    x: number
    y: number
    date: Date
    progress: number
    totalCaloriesBurned: number
    trendIcon: string
    trendColor: string
    comparisonText: string
    comparisonValue: number
}

interface Props {
    viewMode: ViewModeType
    tooltipData: TooltipDataType
    onClose?: () => void
}
const PARENT_HEIGHT = 172
const TOOLTIP_MAX_HEIGHT = 70

function Tooltip({ viewMode, tooltipData, onClose }: Props) {
    const tooltipHeight = TOOLTIP_MAX_HEIGHT
    const adjustedTop = Math.min(tooltipData.y, PARENT_HEIGHT - tooltipHeight)
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.8)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 8,
                useNativeDriver: true
            })
        ]).start()
    }, [fadeAnim, scaleAnim])

    return (
        <Animated.View
            style={[
                styles.tooltip,
                {
                    left: tooltipData.x - 75,
                    top: adjustedTop,
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }
            ]}
        >
            <View style={styles.tooltipHeader}>
                <Text style={styles.tooltipDate}>
                    {tooltipData.date.toLocaleDateString('en-US', {
                        year: viewMode === 'weekly' || viewMode === 'monthly' ? 'numeric' : undefined,
                        month: 'short',
                        day: viewMode === 'weekly' || viewMode === 'monthly' ? 'numeric' : undefined
                    })}
                    {viewMode === 'yearly' && ` ${tooltipData.date.getFullYear()}`}
                </Text>
                <View style={styles.tooltipHeaderRight}>
                    <Text style={styles.tooltipProgress}>{tooltipData.progress}%</Text>
                    {onClose && (
                        <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
                            <Ionicons name='close' size={12} color='#666' />
                        </Pressable>
                    )}
                </View>
            </View>

            <Text style={styles.tooltipWorkout}>Calories Burned: {tooltipData.totalCaloriesBurned}</Text>
            {tooltipData.comparisonText && tooltipData.comparisonValue !== undefined && (
                <Text style={styles.tooltipComparison}>
                    {tooltipData.comparisonText}:
                    <Text style={{ color: tooltipData.trendColor }}>
                        {tooltipData.comparisonValue}% {tooltipData.trendIcon}
                    </Text>
                </Text>
            )}
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${tooltipData.progress}%` }]} />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        padding: 12,
        zIndex: 10,
        borderRadius: 8,
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,

        // Android shadow
        elevation: 8,
        width: 130,
        maxHeight: 85
    },
    tooltipHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tooltipHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    closeButton: {
        padding: 2,
        borderRadius: 8,
        backgroundColor: '#f0f0f0'
    },
    tooltipDate: {
        color: '#666',
        fontSize: 8,
        fontWeight: '400'
    },
    tooltipProgress: {
        color: '#333',
        fontSize: 8,
        fontWeight: '600'
    },
    tooltipTrend: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tooltipWorkout: {
        color: '#666',
        fontSize: 10,

        fontWeight: '400'
    },
    tooltipComparison: {
        color: '#777',
        fontSize: 8,
        marginTop: 2
    },
    progressBar: {
        marginTop: 6,
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#86aeff',
        borderRadius: 3
    }
})

export default memo(Tooltip)

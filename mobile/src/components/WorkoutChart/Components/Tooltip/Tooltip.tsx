// Tooltip.tsx
import { View, Text, StyleSheet } from 'react-native'
import { ViewModeType } from '../../WorkoutChart'

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
}
const PARENT_HEIGHT = 172
const TOOLTIP_MAX_HEIGHT = 70

export default function Tooltip({ viewMode, tooltipData }: Props) {
    const tooltipHeight = TOOLTIP_MAX_HEIGHT
    const adjustedTop = Math.min(tooltipData.y, PARENT_HEIGHT - tooltipHeight)
    return (
        <View style={[styles.tooltip, { left: tooltipData.x - 75, top: adjustedTop }]}>
            <View style={styles.tooltipHeader}>
                <Text style={styles.tooltipDate}>
                    {tooltipData.date.toLocaleDateString('en-US', {
                        year: viewMode === 'weekly' || viewMode === 'monthly' ? 'numeric' : undefined,
                        month: 'short',
                        day: viewMode === 'weekly' || viewMode === 'monthly' ? 'numeric' : undefined
                    })}
                    {viewMode === 'yearly' && ` ${tooltipData.date.getFullYear()}`}
                </Text>
                <Text style={styles.tooltipProgress}>{tooltipData.progress}%</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        padding: 12,
        zIndex: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: 130,
        maxHeight: 85
    },
    tooltipHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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

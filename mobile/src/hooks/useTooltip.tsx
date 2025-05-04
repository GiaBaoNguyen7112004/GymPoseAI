import { useState, useMemo, useCallback } from 'react'
import { formatDate } from '@/utils/format.util'
import { TooltipDataType } from '@/components/WorkoutChart/Components/Tooltip'
import { DataPoint } from '@/utils/chart.util'
import { ViewModeType } from '@/types/utils.type'

export function useTooltip(chartData: DataPoint[], viewMode: ViewModeType) {
    const [tooltipData, setTooltipData] = useState<TooltipDataType | null>(null)

    const getTrend = useCallback((change: number) => {
        if (change > 0) return { icon: '↑', color: '#4CAF50' }
        if (change < 0) return { icon: '↓', color: '#F44336' }
        return { icon: '', color: '#777' }
    }, [])

    const getComparisonLabel = useCallback(
        (prev: DataPoint): string => {
            if (!prev) return ''
            if (viewMode === 'yearly') {
                return prev.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            }
            if (viewMode === 'monthly') {
                return prev.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
            }
            return formatDate(prev.date)
        },
        [viewMode]
    )

    const handleDataPointClick = useCallback(
        ({ index, x, y }: { index: number; x: number; y: number }) => {
            const current = chartData[index]
            const prev = chartData[index - 1]

            if (!current) return

            const caloriesChange = prev ? current.totalCaloriesBurned - prev.totalCaloriesBurned : 0
            const percentageChange = prev?.totalCaloriesBurned ? (caloriesChange / prev.totalCaloriesBurned) * 100 : 100

            const trend = getTrend(caloriesChange)
            const comparisonText = prev ? `vs ${getComparisonLabel(prev)}` : 'First data point'

            setTooltipData((prevTooltipData) => {
                if (
                    prevTooltipData &&
                    prevTooltipData.x === x &&
                    prevTooltipData.y === y &&
                    prevTooltipData.date === current.date &&
                    prevTooltipData.progress === Math.round(current.progress) &&
                    prevTooltipData.totalCaloriesBurned === Math.round(current.totalCaloriesBurned) &&
                    prevTooltipData.trendIcon === trend.icon &&
                    prevTooltipData.trendColor === trend.color &&
                    prevTooltipData.comparisonText === comparisonText &&
                    prevTooltipData.comparisonValue === Math.round(percentageChange)
                ) {
                    return prevTooltipData
                }

                return {
                    visible: true,
                    x,
                    y,
                    date: current.date,
                    progress: Math.round(current.progress),
                    totalCaloriesBurned: Math.round(current.totalCaloriesBurned),
                    trendIcon: trend.icon,
                    trendColor: trend.color,
                    comparisonText,
                    comparisonValue: Math.round(percentageChange)
                }
            })
        },
        [chartData, getTrend, getComparisonLabel]
    )

    return {
        tooltipData,
        handleDataPointClick
    }
}

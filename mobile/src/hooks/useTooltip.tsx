import { useState } from 'react'
import { formatDate } from '@/src/utils/format.util'
import { TooltipDataType } from '@/src/components/WorkoutChart/Components/Tooltip'
import { DataPoint } from '@/src/utils/chart.util'
import { ViewModeType } from '@/src/types/utils.type'

export function useTooltip(chartData: DataPoint[], viewMode: ViewModeType) {
    const [tooltipData, setTooltipData] = useState<TooltipDataType | null>(null)

    const getTrend = (change: number) => {
        if (change > 0) return { icon: '↑', color: '#4CAF50' }
        if (change < 0) return { icon: '↓', color: '#F44336' }
        return { icon: '', color: '#777' }
    }

    const getComparisonLabel = (prev: DataPoint): string => {
        if (!prev) return ''
        if (viewMode === 'yearly') {
            return prev.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }
        if (viewMode === 'monthly') {
            return prev.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        }
        return formatDate(prev.date)
    }

    const handleDataPointClick = ({ index, x, y }: { index: number; x: number; y: number }) => {
        const current = chartData[index]
        const prev = chartData[index - 1]

        if (!current) return

        const caloriesChange = prev ? current.totalCaloriesBurned - prev.totalCaloriesBurned : 0
        const percentageChange = prev?.totalCaloriesBurned ? (caloriesChange / prev.totalCaloriesBurned) * 100 : 100

        const trend = getTrend(caloriesChange)
        const comparisonText = prev ? `vs ${getComparisonLabel(prev)}` : 'First data point'

        setTooltipData({
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
        })
    }

    return {
        tooltipData,
        handleDataPointClick
    }
}

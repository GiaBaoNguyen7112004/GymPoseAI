import { useState, useCallback } from 'react'
import { TooltipDataType } from '@/components/WorkoutChart/Components/Tooltip'
import { DataPoint } from '@/utils/chart.util'
import { ViewModeType } from '@/types/utils.type'

export function useTooltip(chartData: DataPoint[], viewMode: ViewModeType) {
    const [tooltipData, setTooltipData] = useState<TooltipDataType | null>(null)

    const handleDataPointClick = useCallback(
        ({ index, x, y }: { index: number; x: number; y: number }) => {
            const current = chartData[index]
            const prev = chartData[index - 1]

            if (!current) return

            const caloriesChange = prev ? current.totalCaloriesBurned - prev.totalCaloriesBurned : 0
            const percentageChange = prev?.totalCaloriesBurned ? (caloriesChange / prev.totalCaloriesBurned) * 100 : 100

            const trend = caloriesChange > 0 ? { icon: '↑', color: '#4CAF50' } : { icon: '↓', color: '#F44336' }
            const comparisonText = prev ? `vs ${prev.label}` : 'First data point'

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
        },
        [chartData]
    )

    return {
        tooltipData,
        handleDataPointClick
    }
}

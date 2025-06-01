import { useState, useCallback, useEffect } from 'react'
import { TooltipDataType } from '@/components/WorkoutChart/Components/Tooltip'
import { DataPoint } from '@/utils/chart.util'
import { ViewModeType } from '@/types/utils.type'

export function useTooltip(chartData: DataPoint[], viewMode: ViewModeType) {
    const [tooltipData, setTooltipData] = useState<TooltipDataType | null>(null)

    // Auto hide tooltip after 5 seconds
    useEffect(() => {
        if (tooltipData?.visible) {
            const timer = setTimeout(() => {
                setTooltipData(null)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [tooltipData?.visible])

    const handleDataPointClick = useCallback(
        ({ index, x, y }: { index: number; x: number; y: number }) => {
            const current = chartData[index]
            const prev = chartData[index - 1]

            if (!current) return

            const caloriesChange = prev ? current.totalCaloriesBurned - prev.totalCaloriesBurned : 0
            const percentageChange = prev?.totalCaloriesBurned ? (caloriesChange / prev.totalCaloriesBurned) * 100 : 100

            const trend = caloriesChange > 0 ? { icon: '↑', color: '#4CAF50' } : { icon: '↓', color: '#F44336' }
            const comparisonText = prev ? `vs ${prev.label}` : 'First data point'

            // Toggle tooltip - nếu đang hiển thị và click vào cùng một điểm thì ẩn
            const isClickingSamePoint =
                tooltipData?.visible && Math.abs(tooltipData.x - x) < 10 && Math.abs(tooltipData.y - y) < 10

            if (isClickingSamePoint) {
                setTooltipData(null)
                return
            }

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
        [chartData, tooltipData]
    )

    const hideTooltip = useCallback(() => {
        setTooltipData(null)
    }, [])

    return {
        tooltipData,
        handleDataPointClick,
        hideTooltip
    }
}

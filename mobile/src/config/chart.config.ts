import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'

// ** Line Chart configuration **
const lineChartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#F9FAFB',
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientFromOpacity: 0.8,
    backgroundGradientToOpacity: 0.2,
    decimalPlaces: 0,
    propsForHorizontalLabels: {
        dx: -10,
        fontSize: 13,
        fontWeight: '500',
        color: '#6B7280'
    },
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `#6B7280`,
    propsForLabels: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6B7280'
    },
    propsForDots: {
        r: '2',
        strokeWidth: '2',
        stroke: '#6366F1',
        fill: '#FFFFFF'
    },
    propsForBackgroundLines: {
        strokeDasharray: '5,5',
        strokeWidth: 1,
        stroke: '#E5E7EB'
    }
}
const lineChartColor = (opacity = 1) => `rgba(134, 174, 255, ${opacity})`

export const workoutHistoryLineChart = {
    lineChartConfig,
    lineChartColor
}

// ** Progress Ring Chart configuration **
const progressRingChartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1, index?: number) => {
        const colorPalette = ['90,200,250', '76,217,100', '255,59,48']
        const safeIndex = index ?? 0
        return `rgba(${colorPalette[safeIndex % colorPalette.length]}, ${opacity})`
    }
}

export const workoutSummaryProgressRingChart = {
    progressRingChartConfig
}

const activityTrackerBarChartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    decimalPlaces: 0,
    color: (opacity = 1, index) => {
        const colors = ['#4A90E2', '#50C878', '#FF6B6B', '#FFD166']
        return index !== undefined ? colors[index % colors.length] : `rgba(74, 144, 226, ${opacity})`
    },
    labelColor: () => '#7B6F72',
    style: {
        borderRadius: 8,
        padding: 8
    },
    barPercentage: 0.75,
    barRadius: 4,
    propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: '#E0E4E8',
        strokeDasharray: '3, 3'
    },
    propsForLabels: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333'
    },
    stackedBar: true,
    fillShadowGradient: '#4A90E2',
    fillShadowGradientOpacity: 0.2
}

export const activityTrackerBarChart = {
    activityTrackerBarChartConfig
}

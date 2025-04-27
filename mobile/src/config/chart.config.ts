import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'

// ** Line Chart configuration **
const lineChartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    propsForHorizontalLabels: { dx: -15 },
    color: (opacity = 1) => `rgba(134, 174, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
    propsForLabels: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72'
    },
    propsForDots: {
        r: '2',
        strokeWidth: '1',
        stroke: '#86aeff'
    },
    propsForBackgroundLines: {
        strokeDasharray: '',
        strokeWidth: 1.2,
        stroke: '#F7F8F8'
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

// ** Bar Chart configuration **
const activityTrackerBarChartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity, index) => {
        return 'rgba(0, 0, 0, 0.1)'
    },
    labelColor: () => '#7B6F72',
    style: {},
    barPercentage: 0.8,
    propsForBackgroundLines: {
        strokeWidth: 0
    },
    barRadius: 12,
    propsForLabels: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72'
    },
    stackedBar: true
}

export const activityTrackerBarChart = {
    activityTrackerBarChartConfig
}

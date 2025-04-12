import { StyleSheet, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'

interface WorkoutHistoryProgressChartProps {
    data: ProgressChartData
    chartConfig?: AbstractChartConfig
}

function WorkoutHistoryProgressChart({
    data,
    chartConfig = chartProgressConfigDefault
}: WorkoutHistoryProgressChartProps) {
    return (
        <View style={styles.chartContainer}>
            <ProgressChart
                data={data}
                width={120}
                height={120}
                strokeWidth={10}
                radius={32}
                chartConfig={chartConfig}
                hideLegend
                withCustomBarColorFromData
            />
        </View>
    )
}

export default WorkoutHistoryProgressChart

const styles = StyleSheet.create({
    chartContainer: {
        width: 120,
        height: 120
    }
})

const chartProgressConfigDefault: AbstractChartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1, index?: number) => {
        const colors = ['90,200,250', '76,217,100', '255,59,48']
        const safeIndex = index ?? 0
        return `rgba(${colors[safeIndex % colors.length]}, ${opacity})`
    }
}

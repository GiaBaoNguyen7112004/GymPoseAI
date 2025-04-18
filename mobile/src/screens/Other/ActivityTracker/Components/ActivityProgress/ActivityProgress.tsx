import { activityTrackerBarChart } from '@/config/chart.config'
import { targetApi } from '@/services/rest'
import { calculateActivityProgressChart } from '@/utils/chart.util'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width - 80 + 32
function ActivityProgress() {
    const { data } = useQuery({
        queryKey: ['activity'],
        queryFn: targetApi.getWeeklyStatisticsTarget
    })
    const chartData = useMemo(() => {
        const activityData = data?.data.data
        return calculateActivityProgressChart(activityData || [])
    }, [data])
    return (
        <View style={styles.activityProgressCard}>
            <View style={styles.activityProgressHeader}>
                <Text style={styles.sectionTitle}>Activity Progress</Text>
            </View>
            <View style={styles.chartBoxShadow}>
                <View style={styles.chartContainer}>
                    <BarChart
                        yAxisLabel=''
                        yAxisSuffix=''
                        data={chartData}
                        width={screenWidth}
                        height={170}
                        chartConfig={activityTrackerBarChart.activityTrackerBarChartConfig}
                        style={styles.chart}
                        fromZero
                        showBarTops={false}
                        withCustomBarColorFromData={true}
                        flatColor={true}
                        withHorizontalLabels={false}
                    />
                </View>
            </View>
        </View>
    )
}

export default ActivityProgress

const styles = StyleSheet.create({
    activityProgressCard: {
        width: '100%'
    },
    activityProgressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617'
    },
    chartBoxShadow: {
        shadowColor: 'rgba(29, 22, 23, 0.1)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10
    },
    chartContainer: {
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    },
    chart: {
        width: '100%',
        paddingRight: 30,
        marginLeft: -70
    }
})

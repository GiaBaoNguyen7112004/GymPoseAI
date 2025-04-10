import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import Svg, { Rect, LinearGradient, Defs, Stop } from 'react-native-svg'

const screenWidth = Dimensions.get('window').width - 40

const ActivityTracker = () => {
    const [selectedFilter, setSelectedFilter] = useState('Weekly')

    // Dữ liệu mẫu - thay thế bằng dữ liệu thực tế của bạn
    const activityData = [
        { day: 'Sun', percentage: 50 },
        { day: 'Mon', percentage: 80 },
        { day: 'Tue', percentage: 40 },
        { day: 'Wed', percentage: 70 },
        { day: 'Thu', percentage: 90 },
        { day: 'Fri', percentage: 30 },
        { day: 'Sat', percentage: 100 }
    ]

    // Tạo biểu đồ tùy chỉnh với gradient và góc bo tròn
    const renderCustomChart = () => {
        const chartWidth = screenWidth - 20
        const chartHeight = 180
        const barWidth = chartWidth / 9 // Để có khoảng cách giữa các cột
        const maxValue = Math.max(...activityData.map((item) => item.percentage))
        const barGap = (chartWidth - barWidth * activityData.length) / (activityData.length + 1)

        return (
            <View style={styles.customChartContainer}>
                <Svg width={chartWidth} height={chartHeight}>
                    <Defs>
                        <LinearGradient id='gradientBlue' x1='0' y1='0' x2='0' y2='1'>
                            <Stop offset='0' stopColor='#7B8CDE' stopOpacity='1' />
                            <Stop offset='1' stopColor='#A5B8FF' stopOpacity='1' />
                        </LinearGradient>
                        <LinearGradient id='gradientPurple' x1='0' y1='0' x2='0' y2='1'>
                            <Stop offset='0' stopColor='#C17BDE' stopOpacity='1' />
                            <Stop offset='1' stopColor='#E5A5FF' stopOpacity='1' />
                        </LinearGradient>
                    </Defs>

                    {activityData.map((item, index) => {
                        const barHeight = (item.percentage / 100) * (chartHeight - 40)
                        const x = barGap + index * (barWidth + barGap)
                        const y = chartHeight - barHeight - 20
                        const gradientId = index % 2 === 0 ? 'url(#gradientBlue)' : 'url(#gradientPurple)'

                        return (
                            <React.Fragment key={index}>
                                <Rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    rx={10}
                                    ry={10}
                                    fill={gradientId}
                                />
                            </React.Fragment>
                        )
                    })}
                </Svg>

                <View style={styles.chartLabels}>
                    {activityData.map((item, index) => (
                        <Text key={index} style={styles.chartLabel}>
                            {item.day}
                        </Text>
                    ))}
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#f8f9fa' />
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}></TouchableOpacity>
                    <Text style={styles.headerTitle}>Activity Tracker</Text>
                    <TouchableOpacity></TouchableOpacity>
                </View>

                {/* Today Target */}
                <View style={styles.targetContainer}>
                    <View style={styles.targetHeader}>
                        <Text style={styles.sectionTitle}>Today Target</Text>
                        <TouchableOpacity style={styles.addButton}></TouchableOpacity>
                    </View>
                    <View style={styles.targetCards}>
                        <View style={styles.targetCard}>
                            <View style={[styles.iconContainer, { backgroundColor: '#e6f0ff' }]}>
                                <Text style={{ fontSize: 24, color: '#4a7fff' }}>🥛</Text>
                            </View>
                            <View style={styles.targetInfo}>
                                <Text style={styles.targetValue}>9L</Text>
                                <Text style={styles.targetLabel}>Water Intake</Text>
                            </View>
                        </View>
                        <View style={styles.targetCard}>
                            <View style={[styles.iconContainer, { backgroundColor: '#fff2e6' }]}>
                                <Text style={{ fontSize: 24, color: '#ffb366' }}>👣</Text>
                            </View>
                            <View style={styles.targetInfo}>
                                <Text style={styles.targetValue}>7400</Text>
                                <Text style={styles.targetLabel}>Foot Steps</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Activity Progress */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.sectionTitle}>Activity Progress</Text>
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterText}>{selectedFilter}</Text>
                            <Text style={styles.filterArrow}>▼</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chartContainer}>{renderCustomChart()}</View>
                </View>

                {/* Latest Activity */}
                <View style={styles.latestContainer}>
                    <View style={styles.latestHeader}>
                        <Text style={styles.sectionTitle}>Latest Activity</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeMoreText}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.activityList}>
                        <View style={styles.activityItem}>
                            <View style={[styles.activityIcon, { backgroundColor: '#ffebf0' }]}>
                                <Text style={{ fontSize: 20 }}>🥤</Text>
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityTitle}>Drinking 300ml Water</Text>
                                <Text style={styles.activityTime}>About 3 minutes ago</Text>
                            </View>
                            <TouchableOpacity style={styles.activityMoreButton}></TouchableOpacity>
                        </View>
                        <View style={styles.activityItem}>
                            <View style={[styles.activityIcon, { backgroundColor: '#fff0eb' }]}>
                                <Text style={{ fontSize: 20 }}>🍎</Text>
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityTitle}>Eat Snack (Fitbar)</Text>
                                <Text style={styles.activityTime}>About 10 minutes ago</Text>
                            </View>
                            <TouchableOpacity style={styles.activityMoreButton}></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    scrollView: {
        flex: 1,
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    backButton: {
        padding: 5
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    targetContainer: {
        backgroundColor: '#eef1f9',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20
    },
    targetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    addButton: {
        backgroundColor: '#6c7ee1',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    targetCards: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    targetCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    targetInfo: {
        flex: 1
    },
    targetValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    targetLabel: {
        fontSize: 12,
        color: '#888'
    },
    progressContainer: {
        marginBottom: 20
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    filterButton: {
        backgroundColor: '#e0e7ff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterText: {
        color: '#6c7ee1',
        fontWeight: '600',
        marginRight: 5
    },
    filterArrow: {
        fontSize: 10,
        color: '#6c7ee1'
    },
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center'
    },
    customChartContainer: {
        width: '100%',
        height: 220,
        paddingTop: 20
    },
    chartLabels: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10
    },
    chartLabel: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        width: 30
    },
    latestContainer: {
        marginBottom: 20
    },
    latestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    seeMoreText: {
        color: '#888',
        fontSize: 14
    },
    activityList: {
        gap: 10
    },
    activityItem: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    activityInfo: {
        flex: 1
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333'
    },
    activityTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 3
    },
    activityMoreButton: {
        padding: 5
    }
})

export default ActivityTracker

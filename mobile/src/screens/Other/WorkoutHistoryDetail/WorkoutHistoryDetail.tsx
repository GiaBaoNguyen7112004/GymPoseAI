import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import WorkoutHistoryProgressChart from './Components/WorkoutHistoryProgressChart/WorkoutHistoryProgressChart'
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart'

const dataChart: ProgressChartData = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8]
}

export default function WorkoutHistoryDetail() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Activity Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Activity</Text>

                    <View style={styles.activityCard}>
                        <View style={styles.activityInfo}>
                            <View style={styles.activityItem}>
                                <Text style={styles.activityLabel}>Move</Text>
                                <Text style={[styles.activityValue, { color: '#FF3B30' }]}>
                                    9<Text style={styles.activityUnit}>/380CAL</Text>
                                </Text>
                            </View>

                            <View style={styles.activityItem}>
                                <Text style={styles.activityLabel}>Exercise</Text>
                                <Text style={[styles.activityValue, { color: '#4CD964' }]}>
                                    0<Text style={styles.activityUnit}>/30MIN</Text>
                                </Text>
                            </View>

                            <View style={styles.activityItem}>
                                <Text style={styles.activityLabel}>Stand</Text>
                                <Text style={[styles.activityValue, { color: '#5AC8FA' }]}>
                                    0<Text style={styles.activityUnit}>/11HRS</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.ringContainer}>
                            <WorkoutHistoryProgressChart data={dataChart} />
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Steps</Text>
                                <Text style={styles.statValue}>24</Text>
                            </View>

                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Distance</Text>
                                <Text style={styles.statValue}>0.02KM</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* History Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>History</Text>
                        <TouchableOpacity>
                            <Text style={styles.showMoreText}>Show More</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.historyCard}>
                        <View style={styles.historyItem}>
                            <View style={styles.historyIconContainer}>
                                <FontAwesome5 name='walking' size={20} color='#ADFF2F' />
                            </View>
                            <Text style={styles.historyLabel}>Outdoor Walk</Text>
                            <Text style={styles.historyValue}>3.72KM</Text>
                            <Text style={styles.historyDate}>11/26/23</Text>
                        </View>
                    </View>
                </View>

                {/* Trends Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trends</Text>

                    <View style={styles.trendsCard}>
                        <View style={styles.trendsContent}>
                            <View style={styles.trendsIconContainer}>
                                <FontAwesome5 name='walking' size={20} color='#ADFF2F' />
                            </View>
                            <View style={styles.trendsLine} />

                            <Text style={styles.trendsText}>
                                Closing your rings every day is a great way to stay active. Trend arrows help you stay
                                motivated by showing even more details.
                            </Text>

                            <TouchableOpacity>
                                <Text style={styles.getStartedText}>Get Started</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#000'
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center'
    },
    scrollView: {
        flex: 1
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 16
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10
    },
    showMoreText: {
        fontSize: 14,
        color: '#ADFF2F'
    },
    activityCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10
    },
    activityInfo: {
        flexDirection: 'column',
        marginBottom: 15
    },
    activityItem: {
        marginBottom: 8
    },
    activityLabel: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 2
    },
    activityValue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    activityUnit: {
        fontSize: 16,
        color: '#999',
        fontWeight: 'normal'
    },
    ringContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    statItem: {
        flex: 1
    },
    statLabel: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 4
    },
    statValue: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500'
    },
    historyCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    historyIconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(173, 255, 47, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    historyLabel: {
        fontSize: 16,
        color: '#FFF',
        flex: 1
    },
    historyValue: {
        fontSize: 16,
        color: '#FFF',
        marginRight: 10
    },
    historyDate: {
        fontSize: 14,
        color: '#999'
    },
    trendsCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20
    },
    trendsContent: {
        alignItems: 'center'
    },
    trendsIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(173, 255, 47, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    trendsLine: {
        width: 40,
        height: 2,
        backgroundColor: '#ADFF2F',
        marginBottom: 15
    },
    trendsText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 22
    },
    getStartedText: {
        fontSize: 16,
        color: '#ADFF2F',
        fontWeight: '500'
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        paddingBottom: 30, // Extra padding for home indicator area
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#333'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        color: '#777'
    }
})

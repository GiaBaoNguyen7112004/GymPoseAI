import { GradientButton } from '@/src/components/GradientButton'
import { Icon } from '@/src/components/Icon'
import { SCREEN_WIDTH } from '@/src/constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Home() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Welcome Back,</Text>
                        <Text style={styles.headerHeading}>Stefani Wong</Text>
                    </View>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon name='notificationIcon' size={18} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bmiWrapper}>
                    <View style={styles.bmiShadow}>
                        <LinearGradient
                            colors={['#92A3FD', '#9DCEFF']}
                            start={{ x: 0.4, y: 0 }}
                            end={{ x: 0.2, y: 1 }}
                            style={styles.bmiInner}
                        >
                            <View style={styles.bmiContent}>
                                <Text style={styles.bmiHeading}>BMI (Body Mass Index)</Text>
                                <Text style={styles.bmiDescription}>You have a normal weight</Text>
                            </View>

                            <View style={styles.bmiChartContainer}>
                                <Icon name='pieChart' size={176} style={styles.bmiChart} />
                                <Text style={styles.bmiResult}>24.7</Text>
                            </View>

                            {/* Decorative Ellipses */}
                            <View style={[styles.ellipse50, styles.ellipseBottomLeft]} />
                            <View style={[styles.ellipse50, styles.ellipseBottomRight]} />
                            <View style={[styles.ellipse8, styles.ellipseSmall1]} />
                            <View style={[styles.ellipse8, styles.ellipseSmall2]} />
                            <View style={[styles.ellipse8, styles.ellipseSmall3]} />
                            <View style={[styles.ellipse8, styles.ellipseSmall4]} />
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.scheduleWrapper}>
                    <View style={styles.ScheduleAction}>
                        <Text style={styles.scheduleAction__title}>Today Target</Text>
                        <GradientButton Square style={styles.schedule__btn}>
                            <Text style={styles.schedule__btn_text}>Check</Text>
                        </GradientButton>
                    </View>
                </View>
                <View style={styles.activityWrapper}>
                    <View style={styles.activityStatus}>
                        <Text style={styles.title}>Activity Status</Text>
                        <View style={styles.stats}>
                            <View style={styles.stats_waterIntake}>
                                <View style={styles.waterIntake__progressbar}>
                                    <View style={styles.waterIntake__filltrack}></View>
                                </View>
                                <View>
                                    <Text>Water Intake</Text>
                                    <Text>1500 ml</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text>Workout 2</Text>
                                    <Text>Tuesday 11:00 - 12:30 PM</Text>
                                </View>
                                <View>
                                    <Text>Workout 2</Text>
                                    <Text>Tuesday 11:00 - 12:30 PM</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9
    },
    header: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: '#ADA4A5',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    headerHeading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30
    },
    headerButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bmiWrapper: {
        marginTop: 30,
        width: '100%',
        height: 146
    },
    bmiShadow: {
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 5
    },
    bmiInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 22,
        paddingTop: 26,
        paddingLeft: 20,
        paddingRight: 28,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bmiContent: {
        flex: 1
    },
    bmiHeading: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 21,
        width: 162
    },
    bmiDescription: {
        maxWidth: 157,
        marginTop: 5,
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    bmiChartContainer: {
        position: 'relative',
        flex: 1
    },
    bmiChart: {
        position: 'absolute',
        top: -30,
        right: -30
    },
    bmiResult: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
        position: 'absolute',
        top: 15,
        right: 25
    },
    ellipse50: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 999,
        backgroundColor: '#fff',
        opacity: 0.2
    },
    ellipse8: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: '#fff',
        opacity: 0.2
    },
    ellipseBottomLeft: {
        bottom: -18,
        left: -18
    },
    ellipseBottomRight: {
        bottom: -8,
        right: -8
    },
    ellipseSmall1: {
        bottom: 11,
        left: '60%'
    },
    ellipseSmall2: {
        bottom: 32,
        left: '40%'
    },
    ellipseSmall3: {
        top: 12,
        left: '35%'
    },
    ellipseSmall4: {
        top: 22,
        right: '60%'
    },
    scheduleWrapper: {
        marginTop: 38,
        width: '100%'
    },
    ScheduleAction: {
        width: '100%',
        height: 57,
        borderRadius: 16,
        backgroundColor: '#EAF0FF',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    schedule__btn: {
        width: 68,
        height: 28
    },
    schedule__btn_text: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
        position: 'absolute'
    },
    scheduleAction__title: {
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '500'
    },
    activityWrapper: {
        marginTop: 30,
        width: '100%'
    },
    activityStatus: {
        width: '100%'
    },
    stats: {
        marginTop: 16,
        flexDirection: 'row',
        columnGap: 15
    },
    stats_waterIntake: {
        flex: 1,
        height: 315,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 36, 42, 0.05)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10
    },
    waterIntake__progressbar: {
        width: 20,
        height: 275,
        borderRadius: 30,
        backgroundColor: '#F7F8F8'
    },
    waterIntake__filltrack: {}
})

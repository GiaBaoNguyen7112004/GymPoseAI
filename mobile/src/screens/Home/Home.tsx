import { GradientButton } from '@/src/components/GradientButton'
import { Icon } from '@/src/components/Icon'
import { TextGradient } from '@/src/components/TextGradient'
import { SCREEN_WIDTH } from '@/src/constants'
import { LinearGradient } from 'expo-linear-gradient'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon as MyIcon } from '@/src/components/Icon'
import Progress from '@/src/components/Progress'
import { IconName } from '@/src/components/Icon/Icon'
import { useRef } from 'react'
import { navigation } from '@/src/services/NavigationService'

const DATA = [
    { id: 1, value: 600, time: '6am - 8am' },
    { id: 2, value: 700, time: '8am - 10am' },
    { id: 3, value: 750, time: '10am - 12pm' },
    { id: 4, value: 800, time: '12pm - 2pm' },
    { id: 5, value: 850, time: '2pm - 4pm' },
    { id: 6, value: 900, time: '4pm - 6pm' },
    { id: 7, value: 800, time: '6pm - 8pm' },
    { id: 8, value: 750, time: '8pm - 10pm' }
]

const WORKOUT_DATA = [
    {
        id: 1,
        name: 'Lowerbody Workout',
        duration: '30',
        caloriesBurned: '150',
        practice: '15'
    },
    {
        id: 2,
        name: 'Lowerbody Workout',
        duration: '30',
        caloriesBurned: '150',
        practice: '15'
    },
    {
        id: 3,
        name: 'Fullbody Workout',
        duration: '30',
        caloriesBurned: '150',
        practice: '15'
    },
    {
        id: 4,
        name: 'Fullbody Workout',
        duration: '30',
        caloriesBurned: '150',
        practice: '15'
    },
    {
        id: 5,
        name: 'Fullbody Workout',
        duration: '30',
        caloriesBurned: '150',
        practice: '15'
    }
]

const colors: [string, string, ...string[]][] = [
    ['#92A3FD', '#9DCEFF'],
    ['#EEA4CE', '#C58BF2']
]
const names: IconName[] = ['workout1', 'workout2', 'movement1', 'movement2', 'movement3']
function Home() {
    const handleNotificationClick = () => {
        navigation.navigate('Notification')
    }

    const renderWaterLogItem = ({ item }: { item: { id: number; value: number; time: string } }) => (
        <View style={styles.waterIntake__item}>
            <View style={styles.waterIntake__timeline}>
                <MyIcon name='dotGradient' size={8} />
                <MyIcon name='line28Icon' size={24} width={1} style={styles.timeline__line} />
            </View>
            <View>
                <Text style={styles.waterIntake__time}>{item.time}</Text>
                <TextGradient
                    textStyle={styles.waterIntake__value}
                    text={`${item.value} ml`}
                    colors={['#C58BF2', '#EEA4CE']}
                />
            </View>
        </View>
    )

    const scrollYListWorkout = useRef(new Animated.Value(0)).current

    const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    const renderItemWorkout = ({ item, index }: { item: any; index: number }) => {
        const itemHeight = 80 + 15
        const screenCenterY = 300 / 2

        const position = Animated.subtract(scrollYListWorkout, index * itemHeight - screenCenterY + itemHeight / 2)

        const opacity = position.interpolate({
            inputRange: [-itemHeight, 0, itemHeight],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
        })

        const randomColor = getRandomItem(colors)
        const randomIcon = getRandomItem(names)

        return (
            <Animated.View style={[styles.workoutItem, { opacity }]}>
                <LinearGradient
                    colors={randomColor}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 2, y: 0.5 }}
                    locations={[0.8, 0.2]}
                    style={styles.workoutIconBackground}
                >
                    <MyIcon name={randomIcon} size={44} />
                </LinearGradient>
                <View style={styles.workoutItem__content}>
                    <Text style={styles.nameWorkout}>{item.name}</Text>
                    <Text style={styles.statsWorkout}>
                        {item.caloriesBurned} Calories Burn | {item.practice} minutes
                    </Text>
                    <Progress.Bar progress={0.7} barHeight={191} barWidth={10} style={styles.workoutProgressbar} />
                </View>
                <TouchableOpacity>
                    <MyIcon name='arroWRightOutline' size={24} />
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <ScrollView style={styles.safeArea} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Welcome Back,</Text>
                        <Text style={styles.headerHeading}>Stefani Wong</Text>
                    </View>
                    <TouchableOpacity style={styles.headerButton} onPress={handleNotificationClick}>
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
                                <Progress.Bar progress={0.2} />
                                <View style={styles.intakeWaterHistory}>
                                    <Text style={styles.stats__title}>Water Intake</Text>
                                    <TextGradient textStyle={styles.stats__value} text='4 Liters' />
                                    <Text style={[styles.stats__subTitle, styles.waterIntake__subtitle]}>
                                        Real time updates
                                    </Text>
                                    <ScrollView horizontal={true} style={{ width: '100%' }}>
                                        <FlatList
                                            data={DATA}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={renderWaterLogItem}
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={styles.stats__boxRight}>
                                <View
                                    style={[
                                        styles.stats__squareBox,
                                        {
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }
                                    ]}
                                >
                                    <MyIcon name='sleepGraph' width={'100%'} size={110} />
                                </View>
                                <View style={[styles.stats__squareBox, styles.stats__calories]}>
                                    <Text style={styles.stats__title}>Calories</Text>
                                    <TextGradient textStyle={styles.stats__value} text='760 kCal' />
                                    <View style={styles.calories_chart}>
                                        <Progress.Circle progress={0.2} size={66} />
                                        <GradientButton rounded style={styles.calories__btn}>
                                            <Text style={styles.calories__btn_text}>230kCal left</Text>
                                        </GradientButton>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.workoutProgressWrapper}>
                    <View>
                        <Text style={styles.title}>Workout Progress</Text>
                    </View>
                    <Text>Chart in here</Text>
                </View>
                <View style={styles.workoutHistoryWrapper}>
                    <View style={styles.workoutProgressHeader}>
                        <Text style={styles.title}>Latest Workout</Text>
                        <TouchableOpacity>
                            <Text style={styles.subtitle_gray}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{ width: SCREEN_WIDTH, height: 300 }}>
                        <Animated.FlatList
                            data={WORKOUT_DATA}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItemWorkout}
                            contentContainerStyle={styles.workoutList}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYListWorkout } } }], {
                                useNativeDriver: false
                            })}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ScrollView>
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
    subtitle_gray: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#ADA4A5'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH
    },
    header: {
        marginTop: 20,
        width: '90%',
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
        width: '90%',
        marginTop: 30,
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
        width: '90%'
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
        width: '90%'
    },
    activityStatus: {
        width: '100%'
    },
    stats: {
        marginTop: 16,
        flexDirection: 'row',
        columnGap: 15
    },
    stats__title: {
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    stats__value: {
        marginTop: 5,
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 21
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
        elevation: 10,
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 20
    },
    intakeWaterHistory: {
        height: '100%'
    },
    stats__subTitle: {
        fontSize: 10,
        color: '#7B6F72',
        fontWeight: '400',
        lineHeight: 15,
        marginTop: 10
    },
    waterIntake__subtitle: {
        marginBottom: 5
    },
    waterIntake__item: {
        width: 92,
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'flex-start'
    },
    waterIntake__timeline: {
        alignItems: 'center'
    },
    timeline__line: {
        marginVertical: 5
    },
    waterIntake__time: {
        fontSize: 8,
        color: '#ADA4A5',
        fontWeight: '400',
        lineHeight: 12,
        marginTop: -2
    },
    waterIntake__value: {
        fontSize: 8,
        color: '#ADA4A5',
        fontWeight: '500',
        lineHeight: 12,
        marginTop: 3
    },
    stats__boxRight: {
        flex: 1,
        rowGap: 15
    },
    stats__squareBox: {
        width: '100%',
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 36, 42, 0.05)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10
    },
    stats__calories: {
        paddingHorizontal: 20,
        paddingTop: 24
    },
    calories_chart: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6
    },
    calories__btn: {
        width: 48,
        position: 'absolute'
    },
    calories__btn_text: {
        textAlign: 'center',
        position: 'absolute',
        width: 36,
        fontSize: 8,
        lineHeight: 12,
        fontWeight: '400',
        color: '#FFF'
    },
    workoutProgressWrapper: {
        marginTop: 33,
        width: '90%'
    },
    workoutProgressHeader: {
        marginTop: 33,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    workoutHistoryWrapper: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    workoutList: {
        rowGap: 15,
        width: SCREEN_WIDTH,
        backgroundColor: '#fff'
    },
    workoutItem: {
        width: SCREEN_WIDTH * 0.9,
        padding: 15,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: 'rgb(29, 36, 42)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 40,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        alignSelf: 'center'
    },
    workoutIconBackground: {
        width: 50,
        height: 50,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    workoutItem__content: {
        flex: 1,
        justifyContent: 'flex-start',
        height: 80
    },
    nameWorkout: {
        marginTop: 15,
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    statsWorkout: {
        marginTop: 3,
        fontSize: 10,
        color: '#A4A9AD',
        fontWeight: '400',
        lineHeight: 15
    },
    workoutProgressbar: {
        transform: [
            { rotate: '90deg' },
            { translateY: -95 },
            {
                translateX: -80
            }
        ]
    }
})

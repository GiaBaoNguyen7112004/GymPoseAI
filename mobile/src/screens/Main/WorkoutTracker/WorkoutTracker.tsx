import React, { useContext, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetView,
    WINDOW_WIDTH
} from '@gorhom/bottom-sheet'
import { HomeTabScreenProps } from '@/src/navigation/types'
import NavigationBar from '@/src/components/NavigationBar'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '@/src/Contexts/App.context'
import workoutHistoryApi from '@/src/apis/workoutHistory.api'
import WorkoutChart from '@/src/components/WorkoutChart'
import { LinearGradient } from 'expo-linear-gradient'
import { COLOR_BRANDS } from '@/src/constants/common.constants'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import categoriesApi from '@/src/apis/categories.api'
import CategoryCard from '@/src/components/CategoryCard'
import { Category } from '@/src/types/exercises.type'

const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    propsForHorizontalLabels: {
        dx: -15
    },
    color: (opacity = 1) => `rgba(134, 174, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: { fontSize: 12, fontWeight: '400', color: '#FFF' },
    propsForDots: { r: '2.5', strokeWidth: '1', stroke: '#FFF', fill: '#92A3FD' },
    propsForBackgroundLines: { strokeDasharray: '', strokeWidth: 1.2, stroke: '#F7F8F8' }
}

const lineChartColor = (opacity = 1) => `rgba(255, 255, 255, ${opacity})`

function WorkoutTracker({ navigation }: HomeTabScreenProps<'WorkoutTracker'>) {
    const { profile } = useContext(AppContext)

    const { data: workoutQuery } = useQuery({
        queryKey: ['workoutHistory', profile?.id],
        queryFn: () => workoutHistoryApi.getWorkoutHistoryByViewMode({ id: profile?.id as string, viewMode: 'weekly' }),
        staleTime: 1000 * 60 * 5
    })
    const workoutHistoryData = workoutQuery?.data.data || []

    const { data: categoriesQuery } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesApi.getCategories(),
        staleTime: 1000 * 60 * 10
    })
    const categoriesData = categoriesQuery?.data.data || []

    const goBackScreen = () => {
        navigation.goBack()
    }

    const bottomSheetRef = useRef<BottomSheet>(null)

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={-1}
            disappearsOnIndex={-1}
            pressBehavior='none'
            enableTouchThrough={true}
        />
    )

    const handleCategoryPress = (category: Category) => {
        navigation.navigate('CategoryDetail', { category: category })
    }

    const renderCategoryItem = useCallback(({ item }: { item: Category }) => {
        return <CategoryCard itemData={item} onPress={() => handleCategoryPress(item)} />
    }, [])

    return (
        <LinearGradient
            colors={COLOR_BRANDS.primary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.02, y: 0 }}
            style={styles.content}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <NavigationBar
                            title={'Workout Tracker'}
                            callback={goBackScreen}
                            headingStyle={styles.headerTitle}
                        />
                    </View>
                    <View style={styles.graphContainer}>
                        <WorkoutChart
                            viewMode={'weekly'}
                            workoutData={workoutHistoryData}
                            chartConfig={chartConfig}
                            lineChartColor={lineChartColor}
                        />
                    </View>
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={['72%']}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={false}
                    enableContentPanningGesture={false}
                    style={{ marginTop: 100 }}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <View style={styles.trainingSection}>
                            <Text style={styles.trainingTitle}>What Do You Want to Train</Text>
                            <BottomSheetFlatList
                                data={categoriesData}
                                renderItem={renderCategoryItem}
                                keyExtractor={(item) => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                            />
                        </View>
                    </BottomSheetView>
                </BottomSheet>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default WorkoutTracker

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    header: {
        zIndex: 100
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    },
    graphContainer: {
        marginTop: 30,
        flexDirection: 'row',
        height: 120,
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center'
    },
    bottomSheetContent: {
        flex: 1
    },
    trainingSection: {
        flex: 1,
        paddingHorizontal: 20
    },
    trainingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 19,
        color: '#1D1617'
    }
})

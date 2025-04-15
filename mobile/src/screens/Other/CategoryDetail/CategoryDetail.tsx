import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useCallback, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetFlatListMethods,
    BottomSheetView
} from '@gorhom/bottom-sheet'

import NavigationBar from '@/src/components/NavigationBar'
import MyIcon from '@/src/components/Icon'
import WorkoutCard from '@/src/components/WorkoutCard'

import { COLOR_BRANDS, ICONS_CATEGORY_MAP } from '@/src/constants/common.constants'
import { RootStackScreenProps } from '@/src/navigation/types'
import { Exercise } from '@/src/types/exercises.type'
import { categories } from '@/src/types/workoutHistory.type'
import { categoriesApi, workoutApi } from '@/src/services/rest'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function CategoryDetail({ route, navigation }: RootStackScreenProps<'CategoryDetail'>) {
    const { category_id, exercise_id } = route.params

    const { data } = useQuery({
        queryKey: ['workout-category', category_id],
        queryFn: () => workoutApi.getWorkoutByCategoryId({ id: category_id }),
        staleTime: 30000
    })

    const { data: categoryRes } = useQuery({
        queryKey: ['category', category_id],
        queryFn: () => categoriesApi.getCategoriesById({ id: category_id })
    })
    const insets = useSafeAreaInsets()
    const workoutList = data?.data.data || []
    const category = categoryRes?.data.data
    const IconThumbnailCategory = ICONS_CATEGORY_MAP.get(category?.name as categories) || 'movement1'

    const handleWorkoutPress = (id: string) => {
        navigation.navigate('WorkoutDetail', { workout_id: id })
    }

    const renderCategoryItem = useCallback(
        ({ item }: { item: Exercise }) => (
            <WorkoutCard
                itemData={item}
                onPress={() => handleWorkoutPress(item.id)}
                isHighlighted={item.id == exercise_id}
            />
        ),
        [exercise_id]
    )

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={-1}
            disappearsOnIndex={-1}
            pressBehavior='none'
            enableTouchThrough
        />
    )

    const exerciseListRef = useRef<BottomSheetFlatListMethods | null>(null)
    useEffect(() => {
        if (exercise_id && workoutList.length > 0) {
            const index = workoutList.findIndex((c) => c.id == exercise_id)
            if (index !== -1 && exerciseListRef.current) {
                exerciseListRef.current.scrollToIndex({ index, animated: true })
            }
        }
    }, [exercise_id, workoutList])
    return (
        <LinearGradient
            colors={COLOR_BRANDS.primary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.content}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <NavigationBar
                        title='Workout Tracker'
                        callback={navigation.goBack}
                        headingStyle={styles.headerTitle}
                    />
                </View>

                <View style={styles.ThumbnailContainer}>
                    <MyIcon name={IconThumbnailCategory} size={316} />
                </View>

                <BottomSheet
                    index={2}
                    snapPoints={['50%', '72%', '92%']}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={false}
                    enableContentPanningGesture={false}
                    style={{ marginTop: 100 }}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <View style={styles.trainingSection}>
                            <View style={styles.trainingSectionHeader}>
                                <Text style={styles.trainingTitle}>{category?.name}</Text>
                                <Text style={styles.trainingDesc}>
                                    {category?.exercise_count} Exercises | {category?.duration_minutes} mins |{' '}
                                    {category?.duration_minutes} Calories Burn
                                </Text>
                            </View>

                            <Text style={[styles.trainingTitle, styles.exerciseTitle]}>Exercises</Text>
                            <BottomSheetFlatList
                                ref={exerciseListRef}
                                data={workoutList}
                                renderItem={renderCategoryItem}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
                                onScrollToIndexFailed={(info) => {
                                    setTimeout(() => {
                                        exerciseListRef.current?.scrollToIndex({
                                            index: info.index,
                                            animated: true
                                        })
                                    }, 500)
                                }}
                            />
                        </View>
                    </BottomSheetView>
                </BottomSheet>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default CategoryDetail

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
    ThumbnailContainer: {
        marginTop: 0,
        height: 288,
        width: 288,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 999,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    bottomSheetContent: {
        flex: 1
    },
    trainingSection: {
        flex: 1,
        marginTop: 25
    },
    trainingSectionHeader: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    trainingTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
        color: '#1D1617',
        textTransform: 'capitalize'
    },
    trainingDesc: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72',
        textTransform: 'capitalize'
    },
    exerciseTitle: {
        paddingHorizontal: 20
    }
})

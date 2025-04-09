import NavigationBar from '@/src/components/NavigationBar'
import { COLOR_BRANDS, ICONS_CATEGORY_MAP } from '@/src/constants/common.constants'
import { RootStackScreenProps } from '@/src/navigation/types'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetView,
    WINDOW_WIDTH
} from '@gorhom/bottom-sheet'
import { useCallback } from 'react'
import { Exercise } from '@/src/types/exercises.type'
import WorkoutCard from '@/src/components/WorkoutCard'
import { useQuery } from '@tanstack/react-query'
import workoutApi from '@/src/apis/workout.api'
import { categories } from '@/src/types/workoutHistory.type'

function CategoryDetail({ route, navigation }: RootStackScreenProps<'CategoryDetail'>) {
    const { category } = route.params
    const handleGoBack = () => {
        navigation.goBack()
    }
    const { data } = useQuery({
        queryKey: ['workout-category', category.id],
        queryFn: () => workoutApi.getWorkoutByCategoryId({ id: category.id }),
        staleTime: 30000
    })

    const WorkoutData = data?.data.data || []
    const handleWorkoutPress = (id: string) => {
        navigation.navigate('WorkoutDetail', { workout_id: id })
    }
    const renderCategoryItem = useCallback(({ item }: { item: Exercise }) => {
        return <WorkoutCard itemData={item} onPress={() => handleWorkoutPress(item.id)} />
    }, [])

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={-1}
            disappearsOnIndex={-1}
            pressBehavior='none'
            enableTouchThrough={true}
        />
    )

    const IconThumbnailCategory = ICONS_CATEGORY_MAP.get(category.name as categories) || 'movement1'

    return (
        <LinearGradient
            colors={COLOR_BRANDS.primary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.content}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <NavigationBar
                            title={'Workout Tracker'}
                            callback={handleGoBack}
                            headingStyle={styles.headerTitle}
                        />
                    </View>
                    <View style={styles.ThumbnailContainer}>
                        <View style={{ marginTop: -30 }}>
                            <MyIcon name={IconThumbnailCategory} size={316} />
                        </View>
                    </View>
                </View>
                <BottomSheet
                    index={1}
                    snapPoints={['72%']}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={false}
                    enableContentPanningGesture={false}
                    style={{ marginTop: 100 }}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <View style={styles.trainingSection}>
                            <View style={styles.trainingSectionHeader}>
                                <Text style={styles.trainingTitle}>{category.name}</Text>
                                <Text style={styles.trainingDesc}>
                                    {category.exercise_count} Exercises | {category.duration_minutes} mins |{' '}
                                    {category.duration_minutes} Calories Burn
                                </Text>
                            </View>
                            <View>
                                <Text style={[styles.trainingTitle, styles.exerciseTitle]}>Exercises</Text>
                                <BottomSheetFlatList
                                    data={WorkoutData}
                                    renderItem={renderCategoryItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                                />
                            </View>
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
        marginTop: 30,
        flexDirection: 'row',
        height: 288,
        width: 288,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 999,
        alignSelf: 'center',
        alignContent: 'center',
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

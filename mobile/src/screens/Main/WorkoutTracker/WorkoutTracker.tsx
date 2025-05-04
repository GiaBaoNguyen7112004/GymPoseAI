import { View, StyleSheet, SafeAreaView } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { LinearGradient } from 'expo-linear-gradient'
import { COLOR_BRANDS } from '@/constants/common.constants'
import { MainTabScreenProps } from '@/navigation/types'
import { Category } from '@/types/exercises.type'
import CategoryBottomSheet from './Components/CategoryBottomSheet'
import LineChartWorkout from './Components/LineChartWorkout'

function WorkoutTracker({ navigation }: MainTabScreenProps<'WorkoutTracker'>) {
    const handleCategoryPress = (category: Category) => {
        navigation.navigate('CategoryDetail', { category_id: category.id })
    }

    return (
        <LinearGradient
            colors={COLOR_BRANDS.primary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.02, y: 0 }}
            style={styles.BackgroundLinerWrapper}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <NavigationBar
                            title={'Workout Tracker'}
                            callback={() => navigation.goBack()}
                            headingStyle={styles.headerTitle}
                        />
                    </View>

                    <LineChartWorkout />
                    <CategoryBottomSheet handleCategoryPress={handleCategoryPress} />
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default WorkoutTracker

const styles = StyleSheet.create({
    BackgroundLinerWrapper: {
        flex: 1
    },
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    header: {
        marginTop: 10
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    }
})

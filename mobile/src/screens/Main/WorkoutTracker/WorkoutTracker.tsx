import React, { useRef } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { LinearGradient } from 'expo-linear-gradient'
import { COLOR_BRANDS } from '@/constants/common.constants'
import { MainTabScreenProps } from '@/navigation/types'
import { Category } from '@/types/exercises.type'
import CategoryBottomSheet from './Components/CategoryBottomSheet'
import LineChartWorkout from './Components/LineChartWorkout'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import BlankScreenLoader from '@/components/BlankScreenLoader'

function WorkoutTracker({ navigation }: MainTabScreenProps<'WorkoutTracker'>) {
    const { isReady } = useInteractionReadyState()

    const handleCategoryPress = (category: Category) => {
        navigation.navigate('CategoryDetail', { category_id: category.id })
    }

    if (!isReady) {
        return <BlankScreenLoader />
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
                    <NavigationBar
                        title={'Workout Tracker'}
                        callback={() => navigation.goBack()}
                        headingStyle={styles.headerTitle}
                    />
                    <LineChartWorkout />
                </View>
                <CategoryBottomSheet handleCategoryPress={handleCategoryPress} />
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
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10
    }
})

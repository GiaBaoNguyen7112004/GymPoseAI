import { memo, useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import WorkoutCard from '@/components/WorkoutCard'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { searchApi } from '@/services/rest'
import { Exercise } from '@/types/exercises.type'
import LottieView from 'lottie-react-native'
import { defaultKeyExtractor } from '@/utils/list'

interface SearchResultsProps {
    searchText: string
    handleWorkoutCardPress: (workoutId: string) => void
    setIsLoading: (loading: boolean) => void
}

function SearchResults({ searchText, handleWorkoutCardPress, setIsLoading }: SearchResultsProps) {
    const trimmedSearchText = searchText.trim()
    const isSearchActive = trimmedSearchText.length > 0

    const { data, isLoading } = useQuery({
        queryKey: ['search', trimmedSearchText],
        queryFn: () =>
            searchApi.search({
                params: {
                    q: trimmedSearchText,
                    type: 'less'
                }
            }),
        enabled: isSearchActive
    })

    const exerciseList = data?.data.data || []

    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading])

    const renderWorkoutCard = useCallback(
        ({ item }: { item: Exercise }) => (
            <WorkoutCard itemData={item} onPress={() => handleWorkoutCardPress(item.id)} />
        ),
        [handleWorkoutCardPress]
    )

    const renderNoResults = () => {
        if (isSearchActive && exerciseList.length === 0) {
            return (
                <View style={styles.emptyResult}>
                    <Text style={styles.emptyResultText}>No results found.</Text>
                </View>
            )
        }
        return null
    }

    const renderInitialPrompt = () => (
        <View style={styles.noSearchContainer}>
            <LottieView source={require('@/assets/animations/search.json')} autoPlay loop style={styles.searchIcon} />
            <Text style={styles.searchPrompt}>Start searching for workouts...</Text>
        </View>
    )

    return (
        <View style={styles.resultsContainer}>
            {!isSearchActive ? (
                renderInitialPrompt()
            ) : (
                <FlatList
                    data={exerciseList}
                    keyExtractor={defaultKeyExtractor}
                    renderItem={renderWorkoutCard}
                    ListEmptyComponent={renderNoResults}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    style={styles.searchContainer}
                    contentContainerStyle={[styles.searchResults, exerciseList.length === 0 && styles.flexFill]}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    resultsContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchResults: {
        gap: 10,
        paddingBottom: 20
    },
    emptyResult: {
        marginTop: 30,
        alignItems: 'center'
    },
    emptyResultText: {
        color: '#888',
        fontSize: 14
    },
    noSearchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    searchIcon: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    searchPrompt: {
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic'
    },
    flexFill: {
        flex: 1,
        justifyContent: 'center'
    },
    searchContainer: {
        flex: 1,
        width: SCREEN_WIDTH,
        marginTop: 15
    }
})

export default memo(SearchResults)

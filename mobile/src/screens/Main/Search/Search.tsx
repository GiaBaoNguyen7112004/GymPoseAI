import { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import useDebounce from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/services/rest'
import SearchBar from './Components/SearchBar'
import { Exercise } from '@/types/exercises.type'
import WorkoutCard from '@/components/WorkoutCard'
import { MainTabScreenProps } from '@/navigation/types'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

function Search({ navigation }: MainTabScreenProps<'Search'>) {
    const [searchText, setSearchText] = useState<string>('')
    const [isFocused, setIsFocused] = useState(false)

    const debounceValue = useDebounce(searchText, 500)
    const { data, isLoading } = useQuery({
        queryKey: ['search', debounceValue],
        queryFn: () =>
            searchApi.search({
                params: {
                    q: debounceValue,
                    type: 'less'
                }
            }),
        enabled: debounceValue.trim().length > 0
    })

    const exerciseList = data?.data.data || []

    const renderItem = useCallback(
        ({ item }: { item: Exercise }) => (
            <WorkoutCard
                itemData={item}
                onPress={() => navigation.navigate('WorkoutDetail', { workout_id: item.id })}
            />
        ),
        [navigation]
    )

    const renderEmptyItem = () => {
        if (searchText.trim().length > 0 && exerciseList.length === 0) {
            return (
                <View style={styles.emptyResult}>
                    <Text style={styles.emptyResultText}>No results found.</Text>
                </View>
            )
        }
        return null
    }

    const isFocusedShared = useSharedValue(0)

    useEffect(() => {
        isFocusedShared.value = isFocused ? 1 : 0
    }, [isFocused])

    const headingAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isFocusedShared.value == 1 ? 0 : 1, { duration: 200 }),
            transform: [
                {
                    scale: withTiming(isFocusedShared.value == 1 ? 0.8 : 1, { duration: 200 })
                }
            ],
            height: withTiming(isFocusedShared.value ? 25 : 50, { duration: 200 }),
            marginBottom: withTiming(isFocusedShared.value == 1 ? 0 : 10, { duration: 200 })
        }
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrapperScreen}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.searchBarContainer}>
                        <Animated.View style={headingAnimatedStyle}>
                            <Text style={styles.searchBarHeading}>Search</Text>
                        </Animated.View>
                        <SearchBar isLoading={isLoading} onChange={setSearchText} onFocusChange={setIsFocused} />
                    </View>

                    <View style={styles.resultsContainer}>
                        {searchText.trim().length === 0 && (
                            <View style={styles.noSearchContainer}>
                                <Image source={require('@/assets/images/search.png')} style={styles.searchIcon} />
                                <Text style={styles.searchPrompt}>Start searching for workouts...</Text>
                            </View>
                        )}
                        <FlatList
                            data={exerciseList}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={[styles.searchResults, exerciseList.length === 0 && styles.flexFill]}
                            ListEmptyComponent={renderEmptyItem}
                            showsVerticalScrollIndicator={false}
                            style={styles.searchContainer}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Search

const styles = StyleSheet.create({
    wrapperScreen: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    searchBarContainer: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        width: '100%',
        marginTop: 10
    },
    searchBarHeading: {
        fontSize: 35,
        fontWeight: '700',
        color: '#1D1617',
        width: '100%',
        letterSpacing: 1,
        textAlign: 'left'
    },
    searchContainer: {
        flex: 1,
        width: SCREEN_WIDTH * 0.9,
        marginTop: 15
    },
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
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
    }
})

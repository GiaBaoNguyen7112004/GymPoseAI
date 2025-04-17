import { useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import useDebounce from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/services/rest'
import SearchBar from './Components/SearchBar'
import { Exercise } from '@/types/exercises.type'
import WorkoutCard from '@/components/WorkoutCard'
import { HomeTabScreenProps } from '@/navigation/types'
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'

function Search({ navigation }: HomeTabScreenProps<'Search'>) {
    const [searchText, setSearchText] = useState<string>('')
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

    const renderEmptyItem = () => (
        <View style={styles.emptyResult}>
            <Text style={styles.emptyResultText}>No results found.</Text>
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrapperScreen}>
                <SafeAreaView style={styles.container}>
                    <SearchBar isLoading={isLoading} onChange={setSearchText} />
                    <View>
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
    searchContainer: {
        flex: 1,
        width: SCREEN_WIDTH * 0.9,
        marginTop: 15
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
    flexFill: {
        flex: 1,
        justifyContent: 'center'
    }
})

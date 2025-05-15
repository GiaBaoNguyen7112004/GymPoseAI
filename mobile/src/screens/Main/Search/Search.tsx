import { useState, useCallback } from 'react'
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useDebounce from '@/hooks/useDebounce'
import { MainTabScreenProps } from '@/navigation/types'
import Header from './Components/Header'
import SearchResults from './Components/SearchResults'

function Search({ navigation }: MainTabScreenProps<'Search'>) {
    const [searchText, setSearchText] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const debounceValue = useDebounce(searchText, 500)
    const handleWorkoutCardPress = useCallback(
        (exercise_id: string) => {
            navigation.navigate('ExerciseDetail', { exercise_id: exercise_id })
        },
        [navigation]
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrapperScreen}>
                <SafeAreaView style={styles.container}>
                    <Header isLoading={isLoading} setSearchText={setSearchText} />

                    <SearchResults
                        searchText={debounceValue}
                        handleWorkoutCardPress={handleWorkoutCardPress}
                        setIsLoading={setIsLoading}
                    />
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
    }
})

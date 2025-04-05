import React, { useState, useEffect, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, Keyboard, Animated, TouchableWithoutFeedback } from 'react-native'
import { Pressable, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MyIcon from '@/src/components/Icon'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/Devices.constant'
import useDebounce from '@/src/hooks/useDebounce'

function Search() {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState<{ id: string; name: string }[]>([])
    const debounceValue = useDebounce(searchText, 500)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const shadowOpacity = useRef(new Animated.Value(0.07)).current
    const workouts = [
        { id: '1', name: 'Yoga for Beginners' },
        { id: '2', name: 'Cardio Workout' },
        { id: '3', name: 'Strength Training' },
        { id: '4', name: 'Pilates Class' },
        { id: '5', name: 'Full Body Workout' }
    ]

    useEffect(() => {
        if (debounceValue) {
            const filteredResults = workouts.filter((workout) =>
                workout.name.toLowerCase().includes(debounceValue.toLowerCase())
            )
            setSearchResults(filteredResults)
        } else {
            setSearchResults([])
        }
    }, [debounceValue])

    const handleSearch = (text: string) => {
        if (text.startsWith(' ')) {
            setSearchText('')
        } else {
            setSearchText(text)
        }
    }

    const clearSearch = () => {
        setSearchText('')
    }

    const renderItem = useCallback(
        ({ item }: { item: { id: string; name: string } }) => (
            <View style={styles.resultItem}>
                <Text>{item.name}</Text>
            </View>
        ),
        []
    )
    const getShadowStyle = useCallback(
        (elevation: number) => {
            return {
                backgroundColor: '#fff',
                shadowColor: 'rgb(29, 22, 23)',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: shadowOpacity,
                shadowRadius: 40,
                elevation
            }
        },
        [shadowOpacity]
    )

    return (
        <TouchableWithoutFeedback
            style={styles.wrapperScreen}
            onPress={() => {
                Keyboard.dismiss()
                setIsInputFocused(false)
            }}
        >
            <SafeAreaView style={styles.container}>
                <Animated.View
                    style={[
                        styles.searchbar,
                        getShadowStyle(isInputFocused ? 5 : 0),
                        { backgroundColor: isInputFocused ? '#fff' : '#F7F8F8' }
                    ]}
                >
                    <MyIcon name='searchGray' track='red' />
                    <TextInput
                        placeholder='Search workout'
                        placeholderTextColor='#DDDADA'
                        style={styles.search__input}
                        value={searchText}
                        onChangeText={handleSearch}
                        autoFocus={true}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                    {searchText ? (
                        <Pressable style={styles.btnClearSearch} onPress={clearSearch}>
                            <Icon name='close' size={16} />
                        </Pressable>
                    ) : (
                        <>
                            <View style={styles.Standing_partition} />
                            <MyIcon name={isInputFocused ? 'filterGradient' : 'filter'} />
                        </>
                    )}
                </Animated.View>
                <View style={styles.searchResults}>
                    {searchResults.length > 0 ? (
                        <FlatList data={searchResults} renderItem={renderItem} keyExtractor={(item) => item.id} />
                    ) : searchText ? (
                        <Text>No results found.</Text>
                    ) : null}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Search

const styles = StyleSheet.create({
    wrapperScreen: {
        width: SCREEN_WIDTH,
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: '90%',
        alignItems: 'center',
        height: SCREEN_HEIGHT,
        alignSelf: 'center'
    },
    searchbar: {
        width: '100%',
        height: 50,
        padding: 15,
        backgroundColor: '#F7F8F8',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginTop: 20
    },
    searchFocus: {
        backgroundColor: '#fff',
        shadowColor: 'rgb(29, 22, 23)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.07,
        shadowRadius: 40,
        elevation: 5
    },

    search__input: {
        flex: 1
    },
    Standing_partition: {
        height: 20,
        width: 0.5,
        backgroundColor: '#DDDADA'
    },
    searchResults: {
        width: '100%',
        marginTop: 20
    },
    btnClearSearch: {
        width: 23,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDADA',
        borderRadius: 999
    },
    resultItem: {
        width: '100%',
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    }
})

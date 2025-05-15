import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import SearchBar from '../SearchBar'
import { memo, useEffect, useState } from 'react'

interface HeaderProps {
    isLoading: boolean
    setSearchText: (text: string) => void
}

function Header({ isLoading, setSearchText }: HeaderProps) {
    const [isFocused, setIsFocused] = useState(false)
    const isFocusedShared = useSharedValue(0)

    useEffect(() => {
        isFocusedShared.value = isFocused ? 1 : 0
    }, [isFocused])

    // Animated style for the heading based on focus state
    const headingAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isFocusedShared.value === 1 ? 0 : 1, { duration: 200 }),
        transform: [{ scale: withTiming(isFocusedShared.value === 1 ? 0.8 : 1, { duration: 200 }) }],
        height: withTiming(isFocusedShared.value ? 25 : 50, { duration: 200 }),
        marginBottom: withTiming(isFocusedShared.value === 1 ? 0 : 10, { duration: 200 })
    }))

    return (
        <View style={styles.searchBarContainer}>
            <Animated.View style={headingAnimatedStyle}>
                <Text style={styles.searchBarHeading}>Search</Text>
            </Animated.View>
            <SearchBar isLoading={isLoading} onChange={setSearchText} onFocusChange={setIsFocused} />
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default memo(Header)

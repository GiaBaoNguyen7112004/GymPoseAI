import { Pressable, StyleSheet, TextInput, View, ActivityIndicator, Animated } from 'react-native'
import MyIcon from '@/components/Icon'
import { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface SearchBarProps {
    isLoading: boolean
    onChange: (value: string) => void
}

function SearchBar({ isLoading, onChange }: SearchBarProps) {
    const [searchText, setSearchText] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const shadowOpacity = useRef(new Animated.Value(0.07)).current

    const handleSearch = (text: string) => {
        if (text.startsWith(' ')) {
            setSearchText('')
        } else {
            setSearchText(text)
            onChange(text)
        }
    }

    const clearSearch = () => {
        setSearchText('')
        onChange('')
    }

    const renderRightIcon = () => {
        if (!searchText) {
            return (
                <>
                    <View style={styles.divider} />
                    <MyIcon name={isInputFocused ? 'filterGradient' : 'filter'} width={16} />
                </>
            )
        }

        if (isLoading) {
            return (
                <View style={styles.loadingSpinner}>
                    <ActivityIndicator size='small' color='#DDDADA' />
                </View>
            )
        }

        return (
            <Pressable style={styles.clearButton} onPress={clearSearch}>
                <Icon name='close' size={16} color='#FFF' />
            </Pressable>
        )
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: isInputFocused ? '#fff' : '#F7F8F8',
                    shadowOpacity: shadowOpacity,
                    elevation: isInputFocused ? 5 : 0,
                    borderColor: isInputFocused ? '#F7F8F8' : '#DDDADA'
                }
            ]}
        >
            <MyIcon name='searchGray' width={16} />
            <TextInput
                placeholder='Search workout'
                placeholderTextColor='#DDDADA'
                style={styles.input}
                value={searchText}
                onChangeText={handleSearch}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            {renderRightIcon()}
        </Animated.View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        padding: 15,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginTop: 20,
        shadowColor: 'rgb(29, 22, 23)',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 40,
        borderWidth: 1,
        borderColor: '#DDDADA'
    },
    input: {
        flex: 1,
        color: '#1D1617'
    },
    divider: {
        height: 20,
        width: 0.5,
        backgroundColor: '#DDDADA'
    },
    clearButton: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDADA',
        borderRadius: 999
    },
    loadingSpinner: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

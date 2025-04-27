import { Pressable, StyleSheet, TextInput, View, ActivityIndicator, Keyboard, Text } from 'react-native'
import Animated, {
    FadeInRight,
    FadeOutRight,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing
} from 'react-native-reanimated'
import MyIcon from '@/components/Icon'
import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface SearchBarProps {
    isLoading: boolean
    onChange: (value: string) => void
    onFocusChange?: (isFocused: boolean) => void
}

const SearchBar = memo(({ isLoading, onChange, onFocusChange }: SearchBarProps) => {
    const [searchText, setSearchText] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const placeholderOpacity = useSharedValue(1)

    useEffect(() => {
        placeholderOpacity.value = withTiming(isInputFocused ? 0 : 1, {
            duration: 400,
            easing: Easing.inOut(Easing.ease)
        })
    }, [isInputFocused])

    const animatedPlaceholderStyle = useAnimatedStyle(
        () => ({
            opacity: placeholderOpacity.value
        }),
        [placeholderOpacity]
    )

    const handleChangeText = useCallback(
        (text: string) => {
            if (text.startsWith(' ')) {
                setSearchText('')
            } else {
                setSearchText(text)
                onChange(text.trim())
            }
        },
        [onChange]
    )

    const handleSubmitEditing = useCallback(() => {
        onChange(searchText.trim())
        Keyboard.dismiss()
    }, [searchText, onChange])

    const handleFocus = useCallback(() => {
        setIsInputFocused(true)
        onFocusChange?.(true)
    }, [onFocusChange])

    const handleBlur = useCallback(() => {
        setIsInputFocused(false)
        onFocusChange?.(false)
    }, [onFocusChange])

    const clearSearch = useCallback(() => {
        setSearchText('')
        onChange('')
    }, [onChange])

    const handleCancel = useCallback(() => {
        Keyboard.dismiss()
        setIsInputFocused(false)
        onFocusChange?.(false)
    }, [onFocusChange])

    const renderRightIcon = useMemo(() => {
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
    }, [searchText, isLoading, isInputFocused, clearSearch])

    return (
        <View style={styles.wrapper}>
            <View style={styles.inputWrapper}>
                <View style={styles.container}>
                    <MyIcon name='searchGray' width={16} />
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder=''
                            placeholderTextColor='#ADA4A5'
                            style={styles.input}
                            value={searchText}
                            onChangeText={handleChangeText}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            returnKeyType='search'
                            onSubmitEditing={handleSubmitEditing}
                        />
                        {!searchText && (
                            <Animated.Text style={[styles.placeholder, animatedPlaceholderStyle]}>
                                Search workout
                            </Animated.Text>
                        )}
                    </View>
                    {renderRightIcon}
                </View>

                {isInputFocused && (
                    <Animated.View
                        entering={FadeInRight.duration(200).easing(Easing.inOut(Easing.ease))}
                        exiting={FadeOutRight.duration(200).easing(Easing.inOut(Easing.ease))}
                        style={styles.cancelButton}
                    >
                        <TouchableOpacity onPress={handleCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </View>
    )
})

export default SearchBar

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 44,
        backgroundColor: '#F7F8F8',
        borderRadius: 16,
        columnGap: 10,
        position: 'relative'
    },
    input: {
        flex: 1,
        color: '#1D1617',
        fontSize: 16,
        paddingVertical: 0
    },
    placeholder: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        fontSize: 16,
        color: '#ADA4A5',
        textAlignVertical: 'center',
        lineHeight: 44
    },
    divider: {
        width: 0.5,
        height: 20,
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
    },
    cancelButton: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    cancelText: {
        color: '#007AFF',
        fontSize: 16
    }
})

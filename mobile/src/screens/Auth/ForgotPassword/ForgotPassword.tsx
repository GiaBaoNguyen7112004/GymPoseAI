import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Animated,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { SCREEN_WIDTH } from '@/src/constants/devices.constant'
import NavigationBar from '@/src/components/NavigationBar/NavigationBar'
import VerificationScreen from './Screens/VerificationScreen'
import FindAccountScreen from './Screens/FindAccountScreen'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [sendingReset, setSendingReset] = useState(false)
    const [sentReset, setSentReset] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [username, setUsername] = useState('')
    const [code, setCode] = useState(['', '', '', ''])

    const inputRefs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null)
    ]

    const _loadingDeg = useRef(new Animated.Value(0)).current
    const _loadingDeg2 = useRef(new Animated.Value(0)).current

    const { _loadingDegAnimation2, _loadingDegAnimation } = getAnimationActions(
        _loadingDeg,
        loading,
        _loadingDeg2,
        sendingReset
    )

    const _checkExistUsername = async () => {
        setLoading(true)
        // Simulate user check
        setTimeout(() => {
            if (username === 'testuser' || username === 'test@example.com' || username === '1234567890') {
                setLoading(false)
                setUsernameError(false)
                setSentReset(true)
                setSendingReset(true)
                setTimeout(() => {
                    setSendingReset(false)
                }, 2000)
            } else {
                setUsernameError(true)
                setLoading(false)
            }
        }, 1500)
    }

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code]
        newCode[index] = text
        setCode(newCode)

        if (text.length === 1 && index < 3 && inputRefs[index + 1].current) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyPress = (event: { nativeEvent: { key: string } }, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handleFocus = (index: number) => {
        if (code[index] !== '' && inputRefs[index].current) {
            inputRefs[index].current?.setSelection(0, code[index].length)
        }
    }

    useEffect(() => {
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
            inputRefs.forEach((ref) => {
                if (ref.current) ref.current.blur()
            })
        })

        return () => {
            keyboardHideListener.remove()
        }
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View>
                    <NavigationBar title={sentReset ? 'Verification' : 'Forgot Password'} />
                </View>
                {sentReset ? (
                    <VerificationScreen
                        loading={loading}
                        sendingReset={sendingReset}
                        _loadingDegAnimation={_loadingDegAnimation}
                        _loadingDegAnimation2={_loadingDegAnimation2}
                        code={code}
                        inputRefs={inputRefs}
                        handleCodeChange={handleCodeChange}
                        handleKeyPress={handleKeyPress}
                        handleFocus={handleFocus}
                        _loadingDeg2={_loadingDeg2} // Pass _loadingDeg2 to VerificationScreen
                    />
                ) : (
                    <FindAccountScreen
                        username={username}
                        setUsername={setUsername}
                        usernameError={usernameError}
                        loading={loading}
                        _loadingDegAnimation={_loadingDegAnimation}
                        _checkExistUsername={_checkExistUsername}
                        _loadingDeg={_loadingDeg}
                    />
                )}
                <TouchableOpacity activeOpacity={1} style={styles.bottomHelp}>
                    <Text style={{ color: '#318bfb' }}>Need more help?</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ForgotPassword
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    bottomHelp: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function getAnimationActions(
    _loadingDeg: Animated.Value,
    loading: boolean,
    _loadingDeg2: Animated.Value,
    sendingReset: boolean
) {
    const _loadingDegAnimation = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            if (loading) {
                _loadingDeg.setValue(0)
                _loadingDegAnimation()
            }
        })
    }
    const _loadingDegAnimation2 = () => {
        Animated.timing(_loadingDeg2, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            if (sendingReset) {
                _loadingDeg2.setValue(0)
                _loadingDegAnimation2()
            }
        })
    }
    return { _loadingDegAnimation2, _loadingDegAnimation }
}

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
    Keyboard,
    Pressable
} from 'react-native'
import { SCREEN_WIDTH } from '@/src/constants/Devices.constant'
import MyIcon from '@/src/components/Icon'
import NavigationBar from '@/src/components/NavigationBar/NavigationBar'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import GradientButton from '@/src/components/GradientButton'
import TextGradient from '@/src/components/TextGradient'
import { SuperRootStackParamList } from '@/src/navigation/RootStackNavigation'

type ForgotPasswordRouteProp = RouteProp<SuperRootStackParamList, 'ForgotPassword'>
type ForgotPasswordNavigationProp = NavigationProp<SuperRootStackParamList, 'ForgotPassword'>

type ForgotPasswordProps = {
    navigation: ForgotPasswordNavigationProp
    route: ForgotPasswordRouteProp
}

const ForgotPassword = ({ navigation, route }: ForgotPasswordProps) => {
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
                    <NavigationBar
                        title={sentReset ? 'Verification' : 'Forgot Password'}
                        callback={() => navigation.goBack()}
                    />
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

const VerificationScreen = ({
    loading,
    sendingReset,
    _loadingDegAnimation,
    _loadingDegAnimation2,
    code,
    inputRefs,
    handleCodeChange,
    handleKeyPress,
    handleFocus,
    _loadingDeg2 // Receive _loadingDeg2
}: {
    loading: boolean
    sendingReset: boolean
    _loadingDegAnimation: () => void
    _loadingDegAnimation2: () => void
    code: string[]
    inputRefs: React.RefObject<TextInput>[]
    handleCodeChange: (text: string, index: number) => void
    handleKeyPress: (event: { nativeEvent: { key: string } }, index: number) => void
    handleFocus: (index: number) => void
    _loadingDeg2: Animated.Value // Type _loadingDeg2
}) => (
    <View style={styles.verifyScreenWrapper}>
        {sendingReset && (
            <Animated.Image
                onLayout={_loadingDegAnimation2}
                style={{
                    marginLeft: 10,
                    height: 24,
                    width: 24,
                    transform: [
                        {
                            rotate: _loadingDeg2.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }
                    ]
                }}
                source={require('@/src/assets/Icons/waiting.png')}
            />
        )}
        <Text style={styles.titleVerify}>Enter Verification Code</Text>
        <View style={styles.formCodeWrapper}>
            {code.map((digit, i) => (
                <View key={i} style={styles.inputRounded}>
                    <TextInput
                        ref={inputRefs[i]}
                        style={styles.input_code}
                        keyboardType='numeric'
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleCodeChange(text, i)}
                        onKeyPress={(event) => handleKeyPress(event, i)}
                        onFocus={() => handleFocus(i)}
                    />
                </View>
            ))}
        </View>
        <Pressable style={styles.btnResent}>
            <Text style={styles.btnResentText}>If you didn’t receive a code,</Text>
            <TextGradient style={styles.strongText} text=' Resend' />
        </Pressable>
        <GradientButton activeOpacity={0.8} style={styles.btnNext}>
            {!loading && <Text style={styles.btnText}>Send</Text>}
            {loading && (
                <>
                    <Animated.Image
                        onLayout={_loadingDegAnimation}
                        style={{
                            ...styles.loadingIcon,
                            position: 'absolute',
                            transform: [
                                {
                                    rotate: _loadingDeg2.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }
                            ]
                        }}
                        source={require('@/src/assets/Icons/loading.png')}
                    />
                    <Text style={{ lineHeight: 24 }}> </Text>
                </>
            )}
        </GradientButton>
        <Text
            style={{
                color: '#ABABAB',
                fontSize: 12,
                fontWeight: '500',
                marginTop: 58
            }}
        >
            Do you have an account?
        </Text>
        <TouchableOpacity style={styles.btnSignUpWrapper}>
            <Text style={styles.textInnerSignUp}>Sign up</Text>
        </TouchableOpacity>
    </View>
)

const FindAccountScreen = ({
    username,
    setUsername,
    usernameError,
    loading,
    _loadingDegAnimation,
    _checkExistUsername,
    _loadingDeg
}: {
    username: string
    setUsername: (text: string) => void
    usernameError: boolean
    loading: boolean
    _loadingDegAnimation: () => void
    _checkExistUsername: () => Promise<void>
    _loadingDeg: Animated.Value
}) => (
    <View style={styles.centerContainer}>
        <View>
            <Text style={{ marginTop: 72, fontSize: 24, textAlign: 'center' }}>Find Your Account</Text>
            <Text style={{ marginVertical: 20, color: '#666', textAlign: 'center' }}>
                Enter your FitnessX username or the email or phone number linked to account.
            </Text>
        </View>
        <View style={styles.formWrapper}>
            <View style={{ ...styles.inputWrapper, borderColor: usernameError ? 'red' : '#ddd' }}>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    autoFocus={true}
                    placeholder='Username, email '
                    autoCapitalize='none'
                    placeholderTextColor='#ADA4A5'
                    style={styles.input}
                />
            </View>
            <GradientButton onPress={_checkExistUsername} activeOpacity={0.8} style={styles.btnNext}>
                {!loading && <Text style={styles.btnText}>Next</Text>}
                {loading && (
                    <>
                        <Animated.Image
                            onLayout={_loadingDegAnimation}
                            style={{
                                ...styles.loadingIcon,
                                position: 'absolute',
                                transform: [
                                    {
                                        rotate: _loadingDeg.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg']
                                        })
                                    }
                                ]
                            }}
                            source={require('@/src/assets/Icons/loading.png')}
                        />
                        <Text style={{ lineHeight: 24 }}> </Text>
                    </>
                )}
            </GradientButton>
            <View style={styles.divideLine}>
                <View style={styles.ORtextWrapper}>
                    <Text style={{ color: '#333', fontWeight: '600' }}>OR</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.btnLoginWithFacebook}>
                <MyIcon name='logoX' color='#318bfb' size={15} />
                <Text style={{ marginLeft: 10, fontWeight: '800', color: '#92A3FD' }}>Login with FitnessX</Text>
            </TouchableOpacity>
        </View>
    </View>
)

export default ForgotPassword
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    sendingDescription: {
        marginVertical: 10
    },
    verifyScreenWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    formWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleVerify: {
        marginTop: 72,
        color: '#444',
        fontSize: 16,
        fontWeight: '600'
    },
    formCodeWrapper: {
        marginTop: 26,
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        columnGap: 20,
        justifyContent: 'center'
    },

    inputRounded: {
        position: 'relative',
        display: 'flex',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#444'
    },
    input_code: {
        position: 'absolute',
        top: 12,
        width: 24,
        height: 30,
        color: '#444',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    btnResent: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnResentText: {
        color: '#ABABAB',
        fontSize: 14,
        fontWeight: '500'
    },
    strongText: {
        fontSize: 14,
        fontWeight: '500'
    },
    btnNext: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        marginBottom: 29,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnSignUpWrapper: {
        marginTop: 18,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        height: 50,
        borderWidth: 1,
        borderColor: '#444'
    },
    textInnerSignUp: {
        color: '#8F8F8F',
        fontSize: 16,
        fontWeight: '600'
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    },
    inputWrapper: {
        width: '100%',
        height: 48,
        flexShrink: 0,
        paddingHorizontal: 9,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15
    },
    linkText: {
        color: '#ADA4A5',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18,
        textDecorationLine: 'underline',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divideLine: {
        marginVertical: 10,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd'
    },
    ORtextWrapper: {
        width: 41,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH * 0.9 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    btnLoginWithFacebook: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    loadingIcon: {
        width: 25,
        height: 25
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

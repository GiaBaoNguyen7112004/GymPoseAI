import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/Devices'
import { Icon as MyIcon } from '@/src/components/Icon'
import { GradientButton } from '@/src/components/GradientButton'

interface EventHandlers {
    _onChangeUsername: (text: string) => void
    _onChangePassword: (text: string) => void
    _onPressToggleHidePassword: () => void
    _onLogin: () => Promise<void>
}

const RegisterStep2 = (): JSX.Element => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [hidePassword, sethidePassword] = useState<boolean>(true)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [allowLogin, setallowLogin] = useState<boolean>(false)
    const _loadingDeg = new Animated.Value(0)
    const _animationLoadingDeg = () => {
        Animated.timing(_loadingDeg, {
            useNativeDriver: true,
            toValue: 1,
            duration: 400
        }).start(() => {
            _loadingDeg.setValue(0)
            if (loading) {
                _animationLoadingDeg()
            }
        })
    }
    const { _onChangeUsername, _onChangePassword, _onPressToggleHidePassword, _onLogin } = getEventHandlers(
        sethidePassword,
        hidePassword,
        password,
        setallowLogin,
        setUsername,
        username,
        setPassword,
        setLoading,
        dispatch
    )

    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true)
        })

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    const bannerOpacity = useRef(new Animated.Value(1)).current
    const bannerTranslateY = useRef(new Animated.Value(0)).current
    const formTranslateY = useRef(new Animated.Value(0)).current
    const bannerScale = useRef(new Animated.Value(1)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(bannerOpacity, {
                toValue: isKeyboardVisible ? 0.5 : 1,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(bannerTranslateY, {
                toValue: isKeyboardVisible ? -350 : 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(formTranslateY, {
                toValue: isKeyboardVisible ? -350 : 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(bannerScale, {
                toValue: isKeyboardVisible ? 0.7 : 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start()
    }, [isKeyboardVisible])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1 }}>
                        {loading && (
                            <View style={styles.loadingWrapper}>
                                <View style={styles.loading}>
                                    <Animated.Image
                                        onLayout={_animationLoadingDeg}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            marginRight: 10,
                                            transform: [
                                                {
                                                    rotate: _loadingDeg.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['0deg', '360deg']
                                                    })
                                                }
                                            ]
                                        }}
                                        source={require('@/src/assets/Icons/waiting.png')}
                                    />
                                    <Text style={{ fontWeight: '500' }}>Logining...</Text>
                                </View>
                            </View>
                        )}
                        <View style={styles.centerContainer}>
                            <Animated.View
                                style={[
                                    {
                                        opacity: bannerOpacity,
                                        transform: [{ translateY: bannerTranslateY }, { scale: bannerScale }]
                                    }
                                ]}
                            >
                                <MyIcon name='signinIcon' size={350} style={styles.banner} />
                            </Animated.View>

                            <Animated.View style={{ transform: [{ translateY: formTranslateY }] }}>
                                <View style={styles.callToAction}>
                                    <Text style={styles.callToAction__heading}>Let’s complete your profile</Text>
                                    <Text style={styles.callToAction__desc}>
                                        It will help us to know more about you!
                                    </Text>
                                </View>
                                <View style={styles.loginForm}>
                                    <View style={styles.textInputWrapper}>
                                        <TextInput
                                            autoCapitalize='none'
                                            value={username}
                                            onChangeText={_onChangeUsername}
                                            placeholder='Username, email or phone number'
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                        />
                                    </View>
                                    <View style={styles.textInputWrapper}>
                                        <TextInput
                                            value={password}
                                            onChangeText={_onChangePassword}
                                            secureTextEntry={hidePassword}
                                            placeholder='Password'
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                        />
                                        <TouchableOpacity
                                            style={styles.hidePasswordIcon}
                                            onPress={_onPressToggleHidePassword}
                                        >
                                            {hidePassword ? (
                                                <Icon name='eye-off-outline' size={20} color='#333' />
                                            ) : (
                                                <Icon name='eye-outline' color='#318bfb' size={20} />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                    <GradientButton
                                        onPress={_onLogin}
                                        disabled={!allowLogin}
                                        activeOpacity={0.6}
                                        style={{
                                            ...styles.btnLogin,
                                            opacity: allowLogin ? 1 : 0.6
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Login</Text>
                                    </GradientButton>
                                </View>
                            </Animated.View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: SCREEN_HEIGHT,
        flex: 1
    },
    centerContainer: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    banner: {
        width: 375,
        height: 350,
        flexShrink: 0
    },
    callToAction: {
        marginTop: 30,
        alignItems: 'center'
    },
    callToAction__heading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30
    },
    callToAction__desc: {
        color: '#7B6F72',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    loginForm: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9
    },
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 48,
        flexShrink: 0,
        marginVertical: 15
    },
    hidePasswordIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 5,
        top: (44 - 30) / 2
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8'
    },
    btnLogin: {
        marginTop: 7.5,
        width: '100%',
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 1000 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    otherOptionsWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPassword: {
        width: SCREEN_WIDTH * 0.8,
        marginVertical: 15,
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
        width: 40,
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
    registerWrapper: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    loadingWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})

function getEventHandlers(
    sethidePassword: React.Dispatch<React.SetStateAction<boolean>>,
    hidePassword: boolean,
    password: string,
    setallowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    username: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: any
): EventHandlers {
    const _onPressToggleHidePassword = () => {
        sethidePassword(!hidePassword)
    }
    const _onChangeUsername = (text: string) => {
        allowLoginCheck(text, password, setallowLogin)
        setUsername(text)
    }
    const _onChangePassword = (text: string) => {
        allowLoginCheck(username, text, setallowLogin)
        setPassword(text)
    }
    const _onLogin = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert('Logged in successfully')
        }, 1500)
    }
    return {
        _onChangeUsername,
        _onChangePassword,
        _onPressToggleHidePassword,
        _onLogin
    }
}

function allowLoginCheck(
    username: string,
    password: string,
    setallowLogin: React.Dispatch<React.SetStateAction<boolean>>
) {
    setallowLogin(username.length > 0 && password.length > 0)
}

export default RegisterStep2

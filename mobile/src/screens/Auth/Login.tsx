import React, { useState, useCallback } from 'react'
import {
    Animated,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView,
    Platform,
    Pressable
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants'
import { Icon as MyIcon } from '@/src/components/Icon'
import { GradientButton } from '@/src/components/GradientButton'
import { TextGradient } from '@/src/components/TextGradient'
import { navigation } from '@/src/services/NavigationService'
import { validateEmail } from '@/src/utils/validationValue'

const Login = (): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [allowLogin, setAllowLogin] = useState(false)
    const [emailError, setEmailError] = useState('')

    const handleSetAllowLogin = () => {
        setAllowLogin(
            credentials.email.trim() !== '' &&
                credentials.password.trim() !== '' &&
                validateEmail(credentials.email.trim())
        )
    }

    const _onBlurEmail = useCallback(() => {
        if (!validateEmail(credentials.email.trim())) {
            setEmailError('Invalid email format')
        } else {
            setEmailError('')
        }
        handleSetAllowLogin()
    }, [credentials.email, credentials.password])

    const _onPressToggleHidePassword = useCallback(() => {
        setHidePassword((prev) => !prev)
    }, [])

    const _onChange = useCallback((field: 'email' | 'password', value: string) => {
        setCredentials((prev) => {
            const newCredentials = { ...prev, [field]: value.trim() }
            handleSetAllowLogin()
            return newCredentials
        })
    }, [])

    const _onLogin = useCallback(async () => {
        if (!allowLogin) return // Prevent login if not allowed.
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('WelcomeStack')
            //alert('Login thành công');
        }, 2000)
    }, [allowLogin])

    const handleRegister = () => {
        navigation.navigate('Register')
    }
    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

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
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
            <SafeAreaView style={styles.container}>
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
                            <Text style={{ fontWeight: '500' }}>Logging in...</Text>
                        </View>
                    </View>
                )}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <View style={styles.ContainerTop}>
                            <View style={styles.callToAction}>
                                <Text style={styles.callToAction__desc}>Hey there,</Text>
                                <Text style={styles.callToAction__heading}>Welcome Back</Text>
                            </View>
                            <View style={styles.loginForm}>
                                <View style={styles.rowForm}>
                                    <View style={styles.textInputWrapper}>
                                        <MyIcon name='messageIcon' size={18} style={styles.Input__icon} />
                                        <TextInput
                                            autoCapitalize='none'
                                            value={credentials.email}
                                            onChangeText={(text) => _onChange('email', text)}
                                            placeholder='Email'
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                            onBlur={_onBlurEmail}
                                        />
                                    </View>
                                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                                </View>
                                <View style={styles.rowForm}>
                                    <View style={styles.textInputWrapper}>
                                        <MyIcon name='lockIcon' size={18} style={styles.Input__icon} />
                                        <TextInput
                                            value={credentials.password}
                                            onChangeText={(text) => _onChange('password', text)}
                                            secureTextEntry={hidePassword}
                                            placeholder='Password'
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                        />
                                        <TouchableOpacity
                                            style={styles.hidePasswordIcon}
                                            onPress={_onPressToggleHidePassword}
                                        >
                                            <Icon
                                                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                                                size={20}
                                                color={hidePassword ? '#333' : '#318bfb'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.linkText} onPress={handleForgotPassword}>
                                        Forgot your password?
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ContainerBottom}>
                            <GradientButton
                                onPress={_onLogin}
                                disabled={!allowLogin}
                                style={[styles.btnLogin, { opacity: allowLogin ? 1 : 0.6 }]}
                            >
                                <MyIcon name='loginIcon' style={styles.Input__icon} />
                                <Text style={styles.btnText}>Login</Text>
                            </GradientButton>
                            <Pressable style={styles.registerWrapper} onPress={handleRegister}>
                                <Text style={styles.callToAction__desc}>Don’t have an account yet?</Text>
                                <TextGradient style={styles.strongText} text=' Register' />
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: SCREEN_HEIGHT,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    ContainerTop: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        marginBottom: 285
    },
    ContainerBottom: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        marginBottom: 40,
        alignItems: 'center'
    },
    callToAction: {
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 15
    },
    callToAction__heading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30
    },
    callToAction__desc: {
        color: '#1D1617',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    loginForm: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    rowForm: {
        position: 'relative',
        width: '100%',
        marginVertical: 15
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        bottom: -14,
        left: 10
    },
    textInputWrapper: {
        width: '100%',
        height: 48,
        flexShrink: 0,
        paddingHorizontal: 15,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    hidePasswordIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 5,
        top: (44 - 30) / 2,
        backgroundColor: '#F7F8F8'
    },
    input: {
        flex: 1
    },
    Input__icon: {
        marginRight: 10
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
    strongText: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 21
    },
    btnLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7.5,
        width: SCREEN_WIDTH * 0.9,
        marginBottom: 29,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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

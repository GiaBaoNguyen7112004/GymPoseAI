import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/Devices'
import { Icon as MyIcon } from '@/src/components/Icon'
import { GradientButton } from '@/src/components/GradientButton'
import { TextGradient } from '@/src/components/TextGradient'
import { Pressable } from 'react-native-gesture-handler'
import { navigation } from '@/src/services/NavigationService'
import { Checkbox } from '@/src/components/CheckBox'
import { validatePassword as passwordUtils, validateEmail as emailUtils } from '@/src/utils/validationValue'

const RegisterStep1 = (): JSX.Element => {
    const [hidePassword, setHidePassword] = useState(true)
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [allowLogin, setAllowLogin] = useState(false)
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [termsError, setTermsError] = useState('')

    const handleAllowRegister = () => {
        const isValid =
            credentials.firstName.trim() !== '' &&
            credentials.lastName.trim() !== '' &&
            credentials.email.trim() !== '' &&
            credentials.password.trim() !== '' &&
            !firstNameError &&
            !lastNameError &&
            !emailError &&
            !passwordError &&
            hasAcceptedTerms
        setAllowLogin(isValid)
    }

    const _onPressToggleHidePassword = useCallback(() => {
        setHidePassword((prev) => !prev)
    }, [])

    const validateFirstName = (firstName: string) => {
        if (!firstName.trim()) {
            return 'First name is required'
        }
        return ''
    }

    const validateLastName = (lastName: string) => {
        if (!lastName.trim()) {
            return 'Last name is required'
        }
        return ''
    }

    const validateEmail = (email: string) => {
        if (!email.trim()) {
            return 'Email is required'
        } else if (!emailUtils(email)) {
            return 'Invalid email format'
        }
        return ''
    }

    const validatePassword = (password: string) => {
        if (!password.trim()) {
            return 'Password is required'
        } else if (!passwordUtils(password)) {
            return 'Password must be strong'
        }
        return ''
    }

    const _onChange = useCallback(
        (field: 'firstName' | 'lastName' | 'email' | 'password', value: string) => {
            setCredentials((prev) => ({ ...prev, [field]: value.trim() }))
            _onBlur(field)
        },
        [credentials, firstNameError, lastNameError, emailError, passwordError, hasAcceptedTerms]
    )

    const _onBlur = useCallback(
        (field: 'firstName' | 'lastName' | 'email' | 'password') => {
            let error = ''
            if (field === 'firstName') {
                error = validateFirstName(credentials.firstName)
                setFirstNameError(error)
            } else if (field === 'lastName') {
                error = validateLastName(credentials.lastName)
                setLastNameError(error)
            } else if (field === 'email') {
                error = validateEmail(credentials.email)
                setEmailError(error)
            } else if (field === 'password') {
                error = validatePassword(credentials.password)
                setPasswordError(error)
            }
            handleAllowRegister()
        },
        [credentials, firstNameError, lastNameError, emailError, passwordError, hasAcceptedTerms]
    )

    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('RegisterStep2')
    }
    const handleCheckboxChange = () => {
        setHasAcceptedTerms((prev) => !prev)
    }

    useLayoutEffect(() => {
        handleAllowRegister()
        setTermsError(hasAcceptedTerms ? '' : 'Please accept the terms')
    }, [hasAcceptedTerms])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.containerCenterScreen}>
                        <View>
                            <View style={styles.callToAction}>
                                <Text style={styles.callToAction__desc}>Hey there,</Text>
                                <Text style={styles.callToAction__heading}>Create an Account</Text>
                            </View>
                            <View style={styles.registerForm}>
                                <View style={styles.rowForm}>
                                    <View style={styles.textInputWrapper}>
                                        <MyIcon name='profileIcon' size={18} style={styles.Input__icon} />
                                        <TextInput
                                            autoCapitalize='none'
                                            value={credentials.firstName}
                                            onChangeText={(text) => _onChange('firstName', text)}
                                            onBlur={() => _onBlur('firstName')}
                                            placeholder='First Name '
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                        />
                                    </View>
                                    {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                                </View>
                                <View style={styles.rowForm}>
                                    <View style={styles.textInputWrapper}>
                                        <MyIcon name='profileIcon' size={18} style={styles.Input__icon} />
                                        <TextInput
                                            value={credentials.lastName}
                                            onChangeText={(text) => _onChange('lastName', text)}
                                            onBlur={() => _onBlur('lastName')}
                                            placeholder='Last Name'
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                        />
                                    </View>
                                    {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                                </View>
                                <View style={styles.rowForm}>
                                    <View style={styles.textInputWrapper}>
                                        <MyIcon name='messageIcon' size={18} style={styles.Input__icon} />
                                        <TextInput
                                            value={credentials.email}
                                            placeholder='Email'
                                            onChangeText={(text) => _onChange('email', text)}
                                            onBlur={() => _onBlur('email')}
                                            style={styles.input}
                                            placeholderTextColor='#ADA4A5'
                                        />
                                    </View>
                                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                                </View>
                                <View style={styles.rowForm}>
                                    <View style={styles.textInputWrapper}>
                                        <MyIcon name='lockIcon' size={18} style={styles.Input__icon} />
                                        <TextInput
                                            value={credentials.password}
                                            secureTextEntry={hidePassword}
                                            placeholder='Password'
                                            onChangeText={(text) => _onChange('password', text)}
                                            onBlur={() => _onBlur('password')}
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
                                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                                    </View>
                                </View>
                                <View style={styles.policy}>
                                    <View style={styles.checkboxWrapper}>
                                        <Checkbox onValueChange={handleCheckboxChange} />
                                        <Text style={styles.checkboxText}>
                                            By continuing you accept our Privacy Policy and Term of Use
                                        </Text>
                                    </View>
                                    {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <GradientButton
                                onPress={handleRegister}
                                disabled={!allowLogin}
                                activeOpacity={0.6}
                                style={{
                                    ...styles.btnLogin,
                                    opacity: allowLogin ? 1 : 0.6
                                }}
                            >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Register</Text>
                            </GradientButton>
                            <Pressable style={styles.loginWrapper} onPress={handleLogin}>
                                <Text style={styles.callToAction__desc}>Already have an account?</Text>
                                <TextGradient style={styles.strongText} text='  Login' />
                            </Pressable>
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
    containerCenterScreen: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
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
        color: '#1D1617',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    registerForm: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    rowForm: {
        position: 'relative',
        width: '100%',
        marginVertical: 10
    },
    Input__icon: {},
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
    policy: {
        width: '100%'
    },
    checkboxWrapper: {
        marginTop: 5,
        flexDirection: 'row',
        marginLeft: 5
    },
    checkboxText: {
        marginLeft: 10,
        maxWidth: 224,
        color: '#ADA4A5',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 15
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
        width: SCREEN_WIDTH * 0.9,
        shadowColor: 'green',
        shadowOffset: { width: 0, height: 1000 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },

    loginWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    strongText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21
    }
})

export default RegisterStep1

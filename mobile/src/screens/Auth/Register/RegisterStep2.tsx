import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
    Animated,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView,
    Platform,
    Pressable
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/Devices'
import { Icon as MyIcon } from '@/src/components/Icon'
import { GradientButton } from '@/src/components/GradientButton'
import DropdownComponent, { DropdownItem } from '@/src/components/Dropdown/Dropdown'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import { navigation } from '@/src/services/NavigationService'

type Gender = 'Male' | 'Female' | 'Other' | ''

const RegisterStep2 = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)
    const [allowLogin, setAllowLogin] = useState<boolean>(false)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [gender, setGender] = useState<Gender>('')
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
    const [weight, setWeight] = useState<string>('')
    const [height, setHeight] = useState<string>('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [weightError, setWeightError] = useState<string | null>(null)
    const [heightError, setHeightError] = useState<string | null>(null)
    const [genderError, setGenderError] = useState<string | null>(null)
    const [dobError, setDobError] = useState<string | null>(null)

    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleCancel = () => {
        hideDatePicker()
        if (!dateOfBirth) {
            setDobError('This field is required')
        }
    }

    const handleConfirm = (date: Date) => {
        const today = new Date()
        const minDate = new Date()
        minDate.setFullYear(today.getFullYear() - 13)

        if (date > minDate) {
            setDobError('You must be at least 13 years old')
            setDateOfBirth(null)
        } else {
            setDobError(null)
            setDateOfBirth(date)
        }
        hideDatePicker()
    }

    const handleChooseGender = (value: Gender) => {
        setGender(value)
        setGenderError('')
    }

    const DataGender: DropdownItem[] = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ]

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
                toValue: isKeyboardVisible ? -278 : 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(formTranslateY, {
                toValue: isKeyboardVisible ? -278 : 0,
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

    useEffect(() => {
        if (gender !== '') {
            setGenderError(null)
        }
        const isValid =
            gender !== '' &&
            dateOfBirth !== null &&
            weight !== '' &&
            height !== '' &&
            !isNaN(Number(weight)) &&
            !isNaN(Number(height)) &&
            weightError === null &&
            heightError === null &&
            genderError === null &&
            dobError === null
        setAllowLogin(isValid)
    }, [gender, dateOfBirth, weight, height, weightError, heightError, genderError, dobError])

    const handleNext = () => {
        if (allowLogin) {
            setLoading(true)
            console.log({ gender, dateOfBirth, weight, height })
            setTimeout(() => {
                setLoading(false)
                navigation.navigate('RegisterStep3')
            }, 2000)
        }
    }

    const validateWeight = (value: string) => {
        if (value === '') {
            return 'Please enter your weight'
        } else if (isNaN(Number(value))) {
            return 'Weight must be a number'
        }
        return null
    }

    const validateHeight = (value: string) => {
        if (value === '') {
            return 'Please enter your height'
        } else if (isNaN(Number(value))) {
            return 'Height must be a number'
        }
        return null
    }
    const validateGenders = (value: string) => {
        return value === '' ? 'This field is required' : null
    }
    const _onBlur = useCallback(
        (field: 'weight' | 'height' | 'gender') => {
            if (field === 'weight') {
                const error = validateWeight(weight)
                setWeightError(error)
            } else if (field === 'height') {
                const error = validateHeight(height)
                setHeightError(error)
            } else if (field === 'gender') {
                const error = validateGenders(gender)
                setGenderError(error)
            }
        },
        [weight, height]
    )

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
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
                        <Text style={{ fontWeight: '500' }}>Register...</Text>
                    </View>
                </View>
            )}
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.centerContainer}>
                            <Animated.View
                                style={[
                                    {
                                        opacity: bannerOpacity,
                                        transform: [{ translateY: bannerTranslateY }, { scale: bannerScale }]
                                    }
                                ]}
                            >
                                <MyIcon name='registerIcon' size={278} width={375} style={styles.banner} />
                            </Animated.View>
                            <Animated.View style={{ transform: [{ translateY: formTranslateY }] }}>
                                <View style={styles.callToAction}>
                                    <Text style={styles.callToAction__heading}>Let’s complete your profile</Text>
                                    <Text style={styles.callToAction__desc}>
                                        It will help us to know more about you!
                                    </Text>
                                </View>
                                <View style={styles.loginForm}>
                                    <View style={styles.rowForm}>
                                        <View style={styles.textInputWrapper}>
                                            <DropdownComponent
                                                data={DataGender}
                                                onSelect={(value: string) => handleChooseGender(value as Gender)}
                                                iconSource='twoUserIcon'
                                                placeholder='Gender'
                                                onblur={() => _onBlur('gender')}
                                            />
                                        </View>
                                        {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
                                    </View>
                                    <View style={styles.rowForm}>
                                        <View style={styles.textInputWrapper}>
                                            <MyIcon name='calendarIcon' size={18} style={styles.Input__icon} />
                                            <Pressable onPress={showDatePicker}>
                                                {dateOfBirth ? (
                                                    <Text>{moment(dateOfBirth).format('DD/MM/YYYY')}</Text>
                                                ) : (
                                                    <Text style={styles.valuePlaceHolder}> Date of birth</Text>
                                                )}
                                            </Pressable>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode='date'
                                                onConfirm={handleConfirm}
                                                onCancel={handleCancel}
                                            />
                                        </View>
                                        {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}
                                    </View>
                                    <View style={styles.rowForm}>
                                        <View style={styles.textInputWrapper}>
                                            <MyIcon name='weightScaleIcon' size={18} style={styles.Input__icon} />
                                            <TextInput
                                                autoCapitalize='none'
                                                placeholder='Your Weight'
                                                style={styles.input}
                                                placeholderTextColor='#ADA4A5'
                                                keyboardType='numeric'
                                                value={weight}
                                                onChangeText={setWeight}
                                                onBlur={() => _onBlur('weight')}
                                            />
                                        </View>
                                        <LinearGradient
                                            colors={['#C58BF2', '#EEA4CE']}
                                            start={{ x: 0.8, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={styles.gradientBox}
                                        >
                                            <Text style={styles.textInnerGradientBox}>KG</Text>
                                        </LinearGradient>
                                        {weightError ? <Text style={styles.errorText}>{weightError}</Text> : null}
                                    </View>
                                    <View style={styles.rowForm}>
                                        <View style={styles.textInputWrapper}>
                                            <MyIcon name='swapIcon' size={18} style={styles.Input__icon} />
                                            <TextInput
                                                placeholder='Your Height'
                                                style={styles.input}
                                                placeholderTextColor='#ADA4A5'
                                                keyboardType='numeric'
                                                value={height}
                                                onChangeText={setHeight}
                                                onBlur={() => _onBlur('height')}
                                            />
                                        </View>
                                        <LinearGradient
                                            colors={['#C58BF2', '#EEA4CE']}
                                            start={{ x: 0.8, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={styles.gradientBox}
                                        >
                                            <Text style={styles.textInnerGradientBox}>CM</Text>
                                        </LinearGradient>
                                        {heightError ? <Text style={styles.errorText}>{heightError}</Text> : null}
                                    </View>

                                    <GradientButton
                                        disabled={!allowLogin}
                                        activeOpacity={0.6}
                                        style={{
                                            ...styles.btnLogin,
                                            opacity: allowLogin ? 1 : 0.6
                                        }}
                                        onPress={handleNext}
                                    >
                                        <Text style={styles.textInnerBtn}>Next</Text>
                                        <MyIcon name='arrowRightIcon' style={styles.Input__icon} />
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
        flex: 1,
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    banner: {
        flexShrink: 1
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
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    rowForm: {
        position: 'relative',
        width: '100%',
        marginVertical: 9,
        flexDirection: 'row'
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        bottom: -14,
        left: 10
    },
    textInputWrapper: {
        flex: 1,
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
    valuePlaceHolder: {
        color: '#ADA4A5',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18
    },
    input: {
        flex: 1
    },
    Input__icon: {
        marginRight: 10
    },
    gradientBox: {
        marginLeft: 15,
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInnerGradientBox: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500'
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
    btnLogin: {
        marginTop: 30,
        width: '100%',
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 1000 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    textInnerBtn: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 24
    },
    loadingWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})

export default RegisterStep2

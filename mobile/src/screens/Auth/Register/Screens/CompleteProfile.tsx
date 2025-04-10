import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/devices.constant'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'
import { LinearGradient } from 'expo-linear-gradient'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import MyIcon from '@/src/components/Icon'
import GradientButton from '@/src/components/GradientButton'
import DropdownInput from '@/src/components/DropdownInput'
import DatePickerInput from '@/src/components/DatePickerInput'
import TextInputCustom from '@/src/components/TextInput'

import { RootStackScreenProps } from '@/src/navigation/types'
import { schema, SchemaType } from '@/src/utils/rules.util'
import { DataGender } from '@/src/constants/dropdown.constant'

type FormData = Pick<SchemaType, 'date_of_birth' | 'gender' | 'height' | 'weight'>
const formSchema = schema.pick(['date_of_birth', 'gender', 'height', 'weight'])

function CompleteProfile({ navigation }: RootStackScreenProps<'CompleteProfile'>) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    const methods = useForm<FormData>({
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    })

    const canSubmit = methods.formState.isValid

    const onSubmit = () => navigation.replace('ConfirmYourGoal')

    // Keyboard visibility listener
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))
        return () => {
            showSub.remove()
            hideSub.remove()
        }
    }, [])

    // Animations
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

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                    <Text style={styles.heading}>Let’s complete your profile</Text>
                                    <Text style={styles.subHeading}>It will help us to know more about you!</Text>
                                </View>

                                <FormProvider {...methods}>
                                    <View style={styles.formContainer}>
                                        <View style={styles.rowForm}>
                                            <DropdownInput
                                                data={DataGender}
                                                iconSource='twoUserIcon'
                                                placeholder='Gender'
                                                name='gender'
                                            />
                                        </View>

                                        <View style={styles.rowForm}>
                                            <DatePickerInput
                                                icon='calendarIcon'
                                                name='date_of_birth'
                                                label='Date of birth'
                                            />
                                        </View>

                                        <View style={styles.rowForm}>
                                            <View style={{ flex: 1 }}>
                                                <TextInputCustom name='weight' icon='weightScaleIcon' type='numeric' />
                                            </View>
                                            <LinearGradient
                                                colors={['#C58BF2', '#EEA4CE']}
                                                start={{ x: 0.8, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={styles.unitBox}
                                            >
                                                <Text style={styles.unitText}>KG</Text>
                                            </LinearGradient>
                                        </View>

                                        <View style={styles.rowForm}>
                                            <View style={{ flex: 1 }}>
                                                <TextInputCustom name='height' icon='swapIcon' type='numeric' />
                                            </View>
                                            <LinearGradient
                                                colors={['#C58BF2', '#EEA4CE']}
                                                start={{ x: 0.8, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={styles.unitBox}
                                            >
                                                <Text style={styles.unitText}>CM</Text>
                                            </LinearGradient>
                                        </View>

                                        <GradientButton
                                            Square
                                            disabled={!canSubmit}
                                            onPress={onSubmit}
                                            style={[styles.submitBtn, { opacity: canSubmit ? 1 : 0.6 }]}
                                        >
                                            <Text style={styles.submitText}>Next</Text>
                                            <MyIcon name='arrowRightIcon' />
                                        </GradientButton>
                                    </View>
                                </FormProvider>
                            </Animated.View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>

            {/* Optional loading state */}
            {/* loading && <Loader title='Register' /> */}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        height: SCREEN_HEIGHT
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
    heading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30
    },
    subHeading: {
        color: '#7B6F72',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    formContainer: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    rowForm: {
        width: '100%',
        marginVertical: 9,
        flexDirection: 'row'
    },
    unitBox: {
        marginLeft: 15,
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unitText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500'
    },
    submitBtn: {
        marginTop: 30,
        width: WINDOW_WIDTH * 0.9,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 1000 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    submitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    }
})

export default CompleteProfile

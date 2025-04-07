import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/devices.constant'
import MyIcon from '@/src/components/Icon'
import GradientButton from '@/src/components/GradientButton'
import { LinearGradient } from 'expo-linear-gradient'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'
import Loader from '@/src/components/LoaderModal'
import { schema, SchemaType } from '@/src/utils/rules.util'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePickerInput from '@/src/components/DatePickerInput'
import TextInputCustom from '@/src/components/TextInput'
import DropdownInput from '@/src/components/DropdownInput'
import { RootStackScreenProps } from '@/src/navigation/types'
import { DataGender } from '@/src/constants/dropdown.constant'

type FormData = Pick<SchemaType, 'date_of_birth' | 'gender' | 'height' | 'weight'>
const FormSchema = schema.pick(['date_of_birth', 'gender', 'height', 'weight'])

function RegisterStep2({ navigation }: RootStackScreenProps<'RegisterStep2'>) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const loading = false
    const { ...methods } = useForm<FormData>({
        resolver: yupResolver(FormSchema),
        mode: 'onBlur'
    })
    const canSubmit = methods.formState.isValid
    const onSubmit = () => {
        navigation.replace('RegisterStep3')
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

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            {loading && <Loader title='Register' />}
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
                                                style={styles.gradientBox}
                                            >
                                                <Text style={styles.textInnerGradientBox}>KG</Text>
                                            </LinearGradient>
                                        </View>
                                        <View style={styles.rowForm}>
                                            <View style={{ flex: 1 }}>
                                                <TextInputCustom icon='swapIcon' name='height' type='numeric' />
                                            </View>

                                            <LinearGradient
                                                colors={['#C58BF2', '#EEA4CE']}
                                                start={{ x: 0.8, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={styles.gradientBox}
                                            >
                                                <Text style={styles.textInnerGradientBox}>CM</Text>
                                            </LinearGradient>
                                        </View>

                                        <GradientButton
                                            Square
                                            activeOpacity={0.6}
                                            disabled={!canSubmit}
                                            style={{
                                                ...styles.btnSubmit,
                                                opacity: canSubmit ? 1 : 0.6
                                            }}
                                            onPress={onSubmit}
                                        >
                                            <Text style={styles.textInnerBtn}>Next</Text>
                                            <MyIcon name='arrowRightIcon' />
                                        </GradientButton>
                                    </View>
                                </FormProvider>
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
    formContainer: {
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
    btnSubmit: {
        marginTop: 30,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 1000 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10,
        width: WINDOW_WIDTH * 0.9
    },
    textInnerBtn: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 24
    }
})

export default RegisterStep2

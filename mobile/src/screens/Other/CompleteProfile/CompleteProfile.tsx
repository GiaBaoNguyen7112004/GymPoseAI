import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/devices.constant'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'
import { LinearGradient } from 'expo-linear-gradient'
import { FormProvider } from 'react-hook-form'

import MyIcon from '@/components/Icon'
import GradientButton from '@/components/GradientButton'
import DropdownInput from '@/components/DropdownInput'
import DatePickerInput from '@/components/DatePickerInput'
import TextInputCustom from '@/components/TextInput'

import { RootStackScreenProps } from '@/navigation/types'
import { DataGender } from '@/constants/dropdown.constant'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useProfileForm } from '@/hooks/useProfileForm'
import showToast from '@/utils/toast.util'

function CompleteProfile({ navigation }: RootStackScreenProps<'CompleteProfile'>) {
    const { isKeyboardVisible } = useKeyboard()

    const { methods, isPending, onSubmit } = useProfileForm({
        onSuccessCallback: (res) => {
            navigation.replace('ConfirmYourGoal')
            showToast({ title: res.data.message, position: 'top' })
        }
    })
    const canSubmit = methods.formState.isValid

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.centerContainer}>
                        <View style={styles.callToAction}>
                            <Text style={styles.heading}>Let’s complete your profile</Text>
                            <Text style={styles.subHeading}>It will help us to know more about you!</Text>
                        </View>

                        <FormProvider {...methods}>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <ScrollView style={styles.formContainer} scrollEnabled={isKeyboardVisible}>
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
                                            <TextInputCustom
                                                {...methods.register('weight')}
                                                name='weight'
                                                icon='weightScaleIcon'
                                                type='numeric'
                                                returnKeyType='next'
                                                onSubmitEditing={() => {
                                                    methods.setFocus('height')
                                                }}
                                            />
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
                                            <TextInputCustom
                                                {...methods.register('height')}
                                                name='height'
                                                icon='swapIcon'
                                                type='numeric'
                                                returnKeyType='done'
                                                onSubmitEditing={onSubmit}
                                            />
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
                                </ScrollView>
                                <GradientButton
                                    Square
                                    disabled={!canSubmit}
                                    isLoading={isPending}
                                    onPress={onSubmit}
                                    style={styles.submitBtn}
                                >
                                    <Text style={styles.submitText}>Next</Text>
                                    <MyIcon name='arrowRightIcon' />
                                </GradientButton>
                            </View>
                        </FormProvider>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
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
        width: SCREEN_WIDTH * 0.9
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
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10,
        marginBottom: 20
    },
    submitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    }
})

export default CompleteProfile

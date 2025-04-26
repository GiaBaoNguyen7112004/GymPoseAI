import GradientButton from '@/components/GradientButton'
import { useKeyboard } from '@/hooks/useKeyboard'
import { schema, SchemaType } from '@/utils/rules.util'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScreenComponentProps } from '../routes.config'
import DropdownInput from '@/components/DropdownInput'
import DatePickerInput from '@/components/DatePickerInput'
import TextInputCustom from '@/components/TextInput'
import { LinearGradient } from 'expo-linear-gradient'
import { DataGender } from '@/constants/dropdown.constant'
import { useMutation } from '@tanstack/react-query'
import { userApi } from '@/services/rest'
import { Gender } from '@/types/user.type'
import handleFormError from '@/utils/handleFormError'
import showToast from '@/utils/toast.util'
import useUserData from '@/hooks/useUserData'
import { useEffect } from 'react'

type FormData = Pick<SchemaType, 'date_of_birth' | 'gender' | 'height' | 'weight'>
const formSchema = schema.pick(['date_of_birth', 'gender', 'height', 'weight'])

function UpdateProfileDetailScreen({ onGoBack, goToTop }: ScreenComponentProps) {
    const { isKeyboardVisible } = useKeyboard()
    const { userData, refetch } = useUserData()
    const methods = useForm<FormData>({
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    })
    const { mutate: updateProfileMutate, isPending } = useMutation({
        mutationFn: userApi.updateProfile
    })
    const canSubmit = methods.formState.isValid

    useEffect(() => {
        methods.setValue('date_of_birth', userData?.date_of_birth ? new Date(userData.date_of_birth) : new Date())
        methods.setValue('gender', userData?.gender as Gender)
        methods.setValue('height', userData?.height ?? 0)
        methods.setValue('weight', userData?.weight ?? 0)
    }, [userData?.date_of_birth, userData?.weight, userData?.height, userData?.gender])

    const onSubmit = methods.handleSubmit((data) => {
        const body = {
            ...data,
            date_of_birth: data.date_of_birth.toISOString(),
            gender: data.gender as Gender
        }
        updateProfileMutate(body, {
            onSuccess: (res) => {
                const message = res.data.message
                showToast({ title: message })
                if (goToTop) goToTop()
                refetch()
            },
            onError: (errors) => handleFormError<FormData>(errors, methods.setError)
        })
    })
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onGoBack}>
                        <Ionicons name='chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={{ width: 24 }} />
                </View>

                <FormProvider {...methods}>
                    <View style={styles.formInputs}>
                        <ScrollView keyboardShouldPersistTaps='handled' scrollEnabled={isKeyboardVisible}>
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
                                    <DatePickerInput icon='calendarIcon' name='date_of_birth' label='Date of birth' />
                                </View>
                                <View style={styles.rowForm}>
                                    <View style={{ flex: 1 }}>
                                        <TextInputCustom
                                            name='weight'
                                            icon='weightScaleIcon'
                                            type='numeric'
                                            returnKeyType='next'
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
                                            name='height'
                                            icon='swapIcon'
                                            type='numeric'
                                            returnKeyType='done'
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
                            </View>
                        </ScrollView>

                        <View style={styles.formBottom}>
                            <GradientButton
                                Square
                                style={styles.reviewButton}
                                disabled={!canSubmit}
                                isLoading={isPending}
                                onPress={onSubmit}
                            >
                                <Text style={styles.reviewButtonText}>Save</Text>
                            </GradientButton>
                        </View>
                    </View>
                </FormProvider>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '600'
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    formInputs: {
        flex: 1
    },
    inputsWrapper: {
        borderRadius: 10,
        marginTop: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DDDADA',
        marginHorizontal: 20
    },
    formBottom: {
        borderTopWidth: 1,
        borderTopColor: '#DDDADA',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    reviewButton: {
        marginTop: 20
    },
    reviewButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
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
    }
})

export default UpdateProfileDetailScreen

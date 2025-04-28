import GradientButton from '@/components/GradientButton'
import { useKeyboard } from '@/hooks/useKeyboard'
import { schema, SchemaType } from '@/utils/rules.util'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScreenComponentProps } from '../routes.config'
import DropdownInput from '@/components/DropdownInput'
import DatePickerInput from '@/components/DatePickerInput'
import { DataGender } from '@/constants/dropdown.constant'
import { useMutation } from '@tanstack/react-query'
import { userApi } from '@/services/rest'
import { Gender } from '@/types/user.type'
import handleFormError from '@/utils/handleFormError'
import showToast from '@/utils/toast.util'
import useUserData from '@/hooks/useUserData'
import { useEffect } from 'react'
import TextInputWithUnit from '@/components/TextInputWithUnit'

type FormData = Pick<SchemaType, 'date_of_birth' | 'gender' | 'height' | 'weight'>
const formSchema = schema.pick(['date_of_birth', 'gender', 'height', 'weight'])

function UpdateProfileDetailScreen({ onGoBack, goToTop }: ScreenComponentProps) {
    const { isKeyboardVisible } = useKeyboard()
    const { userData, refetch } = useUserData()
    const methods = useForm<FormData>({
        resolver: yupResolver(formSchema),
        mode: 'onChange'
    })
    const { mutate: updateProfileMutate, isPending } = useMutation({
        mutationFn: userApi.updateProfile
    })

    useEffect(() => {
        if (userData) {
            methods.setValue('date_of_birth', new Date(userData.date_of_birth) || new Date())
            methods.setValue('gender', userData.gender as Gender)
            methods.setValue('height', userData.height ?? 0)
            methods.setValue('weight', userData.weight ?? 0)
        }
    }, [userData, methods])

    const onSubmit = methods.handleSubmit((data) => {
        const body = {
            ...data,
            date_of_birth: data.date_of_birth.toISOString(),
            gender: data.gender as Gender
        }
        updateProfileMutate(body, {
            onSuccess: (res) => {
                showToast({ title: res.data.message })
                if (goToTop) goToTop()
                refetch()
            },
            onError: (errors) => handleFormError<FormData>(errors, methods.setError)
        })
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onGoBack}>
                    <Ionicons name='chevron-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            <FormProvider {...methods}>
                <View style={styles.formContainer}>
                    <ScrollView
                        style={styles.formInputs}
                        keyboardShouldPersistTaps='handled'
                        scrollEnabled={isKeyboardVisible}
                    >
                        <FormRow>
                            <DropdownInput
                                data={DataGender}
                                iconSource='twoUserIcon'
                                placeholder='Gender'
                                name='gender'
                            />
                        </FormRow>
                        <FormRow>
                            <DatePickerInput icon='calendarIcon' name='date_of_birth' label='Date of birth' />
                        </FormRow>
                        <FormRow>
                            <TextInputWithUnit
                                {...methods.register('weight')}
                                name='weight'
                                icon='weightScaleIcon'
                                type='numeric'
                                unit='KG'
                                returnKeyType='next'
                                onSubmitEditing={() => {
                                    methods.setFocus('height')
                                }}
                            />
                        </FormRow>
                        <FormRow>
                            <TextInputWithUnit
                                {...methods.register('height')}
                                name='height'
                                icon='swapIcon'
                                type='numeric'
                                unit='CM'
                                returnKeyType='done'
                                onSubmitEditing={onSubmit}
                            />
                        </FormRow>
                    </ScrollView>
                </View>

                <View style={styles.formBottom}>
                    <GradientButton
                        Square
                        style={styles.reviewButton}
                        disabled={!methods.formState.isValid}
                        isLoading={isPending}
                        onPress={onSubmit}
                    >
                        <Text style={styles.reviewButtonText}>Save</Text>
                    </GradientButton>
                </View>
            </FormProvider>
        </View>
    )
}

const FormRow = ({ children }: { children: React.ReactNode }) => <View style={styles.rowForm}>{children}</View>

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
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
    headerSpacer: {
        width: 24
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    formInputs: {
        flex: 1
    },
    rowForm: {
        width: '100%',
        marginVertical: 9,
        flexDirection: 'row'
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
    }
})

export default UpdateProfileDetailScreen

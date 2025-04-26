import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema, SchemaType } from '@/utils/rules.util'
import GradientButton from '@/components/GradientButton'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useMutation } from '@tanstack/react-query'
import { userApi } from '@/services/rest'
import showToast from '@/utils/toast.util'
import { omit } from 'lodash'
import useUserData from '@/hooks/useUserData'
import TextInputCustom from '@/components/TextInput'
import handleFormError from '@/utils/handleFormError'

type FormData = Pick<SchemaType, 'password' | 'old_password' | 'confirm_password'>
const formSchema = schema.pick(['password', 'old_password', 'confirm_password'])

interface UpdatePasswordScreenProps {
    onClose: () => void
}

function PasswordAndSecurity({ onClose }: UpdatePasswordScreenProps) {
    const { isKeyboardVisible } = useKeyboard()
    const { userData } = useUserData()

    const methods = useForm<FormData>({
        defaultValues: {
            confirm_password: '',
            old_password: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(formSchema)
    })

    const { mutate: changePasswordMutate, isPending } = useMutation({
        mutationFn: userApi.changePassword
    })

    const onSubmit = methods.handleSubmit((data) => {
        const body = omit(data, 'confirm_password')
        changePasswordMutate(body, {
            onSuccess: (res) => {
                onClose()
                showToast({ title: res.data.message })
            },
            onError: (errors) => handleFormError<FormData>(errors, methods.setError)
        })
    })

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.headerCloseButton}>
                        <Ionicons name='close' size={24} color='black' />
                    </TouchableOpacity>

                    <View style={styles.headerContent}>
                        <Text style={styles.headerName}>{userData?.first_name} · fitnessX</Text>
                        <Text style={styles.headerTitle}>Password and Security</Text>
                        <Text style={styles.headerNote}>
                            Your password must be at least 6 characters and should include a combination of numbers,
                            letters and special characters (!$@%).
                        </Text>
                    </View>

                    <View style={styles.headerSpacer} />
                </View>

                <FormProvider {...methods}>
                    <View style={styles.formContainer}>
                        <View style={styles.formInputs}>
                            <ScrollView keyboardShouldPersistTaps='handled' scrollEnabled={isKeyboardVisible}>
                                <View style={styles.inputsWrapper}>
                                    <TextInputCustom
                                        name='old_password'
                                        type='password'
                                        placeholder='Old password'
                                        returnKeyType='next'
                                        containerStyle={styles.input}
                                    />
                                    <TextInputCustom
                                        name='password'
                                        type='password'
                                        placeholder='New password'
                                        returnKeyType='next'
                                        containerStyle={styles.input}
                                    />
                                    <TextInputCustom
                                        name='confirm_password'
                                        type='password'
                                        placeholder='Confirm password'
                                        returnKeyType='done'
                                        containerStyle={styles.input}
                                    />
                                </View>
                            </ScrollView>
                        </View>

                        <View style={styles.formBottom}>
                            <GradientButton
                                Square
                                style={styles.reviewButton}
                                disabled={!methods.formState.isValid}
                                onPress={onSubmit}
                                isLoading={isPending}
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
        flexDirection: 'column'
    },
    headerCloseButton: {
        paddingRight: 10
    },
    headerContent: {
        marginTop: 10
    },
    headerName: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1D1617',
        marginBottom: 4
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '500',
        color: '#1D1617',
        marginBottom: 6
    },
    headerNote: {
        fontSize: 13,
        color: '#1D1617',
        lineHeight: 18
    },
    headerSpacer: {
        width: 24
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    formInputs: {
        flex: 1
    },
    inputsWrapper: {
        marginTop: 16,
        marginHorizontal: 20,
        gap: 16
    },
    input: {
        borderColor: '#DDDADA',
        borderWidth: 1
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

export default PasswordAndSecurity

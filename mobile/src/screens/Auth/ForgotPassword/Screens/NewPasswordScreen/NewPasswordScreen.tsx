import { StyleSheet, Text, View } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import GradientButton from '@/src/components/GradientButton'
import TextInputCustom from '@/src/components/TextInput'

import { authApi } from '@/src/services/rest'
import { schema, SchemaType } from '@/src/utils/rules.util'
import handleFormError from '@/src/utils/handleFormError'

interface ChangePasswordScreenProps {
    email: string
    otp: string
    onSuccess: () => void
}

type FormData = Pick<SchemaType, 'password'>
const FormSchema = schema.pick(['password'])

function ChangePasswordScreen({ email, otp, onSuccess }: ChangePasswordScreenProps) {
    const methods = useForm<FormData>({
        defaultValues: { password: '' },
        mode: 'onBlur',
        resolver: yupResolver(FormSchema)
    })

    const { handleSubmit, formState, setError } = methods
    const { isValid } = formState

    const { mutate, isPending } = useMutation({
        mutationFn: authApi.resetPassword,
        onSuccess: onSuccess,
        onError: (error) => handleFormError<FormData>(error, setError)
    })

    const onSubmit = handleSubmit((data) => {
        mutate({ email, otp, password: data.password })
    })

    return (
        <FormProvider {...methods}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create a new password</Text>
                <Text style={styles.instructions}>
                    Create a password with at least 6 letters and numbers. You'll need this password to log into your
                    account.
                </Text>

                <TextInputCustom name='password' icon='lockIcon' type='password' autoFocus />

                <GradientButton
                    Square
                    containerStyle={styles.continueButton}
                    onPress={onSubmit}
                    isLoading={isPending}
                    disabled={!isValid}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </GradientButton>
            </View>
        </FormProvider>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24
    },
    title: {
        marginTop: 10,
        marginBottom: 12,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1617'
    },
    instructions: {
        fontSize: 16,
        color: '#1D1617',
        lineHeight: 24,
        marginBottom: 32
    },
    continueButton: {
        marginTop: 20
    },
    continueButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600'
    }
})

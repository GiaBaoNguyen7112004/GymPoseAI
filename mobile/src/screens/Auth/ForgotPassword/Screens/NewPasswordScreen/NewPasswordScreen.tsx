import authApi from '@/src/apis/auth.api'
import GradientButton from '@/src/components/GradientButton'
import TextInputCustom from '@/src/components/TextInput'
import handleFormError from '@/src/utils/handleFormError'
import { schema, SchemaType } from '@/src/utils/rules.util'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

interface ChangePasswordScreenProps {
    email: string
    otp: string
    onSuccess: () => void
}
type FormData = Pick<SchemaType, 'password'>
const FormSchema = schema.pick(['password'])

function ChangePasswordScreen({ email, otp, onSuccess }: ChangePasswordScreenProps) {
    const methods = useForm<FormData>({
        defaultValues: {
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(FormSchema)
    })
    const { mutate: resetPasswordMutate, isPending } = useMutation({
        mutationFn: authApi.resetPassword
    })

    const handleSubmit = methods.handleSubmit
    const canSubmit = methods.formState.isValid
    const onSubmit = handleSubmit((data) => {
        const body = {
            email,
            otp,
            password: data.password
        }
        resetPasswordMutate(body, {
            onSuccess: () => {
                onSuccess()
            },
            onError: (errors) => handleFormError<FormData>(errors, methods.setError)
        })
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
                    disabled={!canSubmit}
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
        paddingHorizontal: 24,
        flex: 1
    },
    title: {
        marginTop: 10,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1617',
        marginBottom: 12
    },
    instructions: {
        fontSize: 16,
        color: '#1D1617',
        marginBottom: 32,
        lineHeight: 24
    },
    continueButton: {
        marginTop: 20
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})

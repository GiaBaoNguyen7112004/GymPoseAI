import GradientButton from '@/src/components/GradientButton'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import Loader from '@/src/components/Loader'
import Icon from 'react-native-vector-icons/FontAwesome'
import { schema, SchemaType } from '@/src/utils/rules.util'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/src/apis/auth.api'
import { User } from '@/src/types/user.type'
import TextInputCustom from '@/src/components/TextInput'
import { SCREEN_WIDTH } from '@/src/constants/devices.constant'
import handleFormError from '@/src/utils/handleFormError'
import { yupResolver } from '@hookform/resolvers/yup'
interface FindAccountScreenProps {
    onSuccess: (email: string) => void
    email: string
    handleGotoLogin?: () => void
}

type FormData = Pick<SchemaType, 'email'>
const FormSchema = schema.pick(['email'])

function FindAccountScreen({ onSuccess, email, handleGotoLogin }: FindAccountScreenProps) {
    const methods = useForm<FormData>({
        defaultValues: {
            email: email
        },
        mode: 'onBlur',
        resolver: yupResolver(FormSchema)
    })

    const { handleSubmit } = methods
    const canSubmit = methods.formState.isValid

    const { mutate: findPasswordMutate, isPending } = useMutation({
        mutationFn: authApi.findAccount,
        onSuccess: (data) => {
            const user = data.data.data.user
            onSuccess(user.email)
        },
        onError: (error) => handleFormError<FormData>(error, methods.setError)
    })

    const onSubmit = handleSubmit((data) => {
        const body = { email: data.email }
        findPasswordMutate(body, {
            onSuccess: (data) => {
                const email = data.data.data.user.email
                onSuccess(email)
            },
            onError: (errors) => handleFormError<FormData>(errors, methods.setError)
        })
    })

    return (
        <View style={styles.centerContainer}>
            <Text style={styles.headerText}>Find Your Account</Text>
            <Text style={styles.descriptionText}>Enter your FitnessX email linked to your account.</Text>

            <FormProvider {...methods}>
                <View style={styles.formWrapper}>
                    <View style={styles.inputWrapper}>
                        <TextInputCustom name='email' type='default' icon='messageIcon' />
                    </View>

                    <GradientButton
                        activeOpacity={0.8}
                        containerStyle={styles.btnNext}
                        Square
                        disabled={!canSubmit}
                        isLoading={isPending}
                        onPress={onSubmit}
                    >
                        <Text style={styles.btnText}>Next</Text>
                    </GradientButton>

                    <View style={styles.divideLine}>
                        <View style={styles.ORtextWrapper}>
                            <Text style={styles.textOr}>OR</Text>
                        </View>
                    </View>
                    <View style={styles.otherOptionsWrapper}>
                        <Pressable style={styles.btnOther}>
                            <Icon name='facebook-f' size={20} color='#1877F2' />
                        </Pressable>
                        <Pressable style={styles.btnOther} onPress={handleGotoLogin}>
                            <MyIcon name='logoX' color='#318bfb' size={15} />
                        </Pressable>
                    </View>
                </View>
            </FormProvider>
        </View>
    )
}

export default FindAccountScreen

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        marginTop: 72,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '600'
    },
    descriptionText: {
        marginVertical: 20,
        color: '#666',
        textAlign: 'center'
    },
    formWrapper: {
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    inputWrapper: {
        width: '100%'
    },
    btnNext: {
        marginTop: 30,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10,
        width: '100%',
        height: 50
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    },
    loadingText: {
        lineHeight: 24
    },
    divideLine: {
        width: SCREEN_WIDTH * 0.9,
        marginTop: 29,
        position: 'relative',
        height: 1,
        backgroundColor: '#DDDADA'
    },
    ORtextWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        backgroundColor: '#fff'
    },
    textOr: {
        color: '#1D1617',
        fontSize: 12,
        fontWeight: 400
    },
    otherOptionsWrapper: {
        marginTop: 29,
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12
    },
    btnOther: {
        width: 50,
        height: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#DDDADA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLoginWithFitnessX: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fbText: {
        marginLeft: 10,
        fontWeight: '800',
        color: '#92A3FD'
    }
})

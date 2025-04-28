import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import GradientButton from '@/components/GradientButton'
import MyIcon from '@/components/Icon'
import TextInputCustom from '@/components/TextInput'

import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { schema, SchemaType } from '@/utils/rules.util'
import handleFormError from '@/utils/handleFormError'
import { authApi } from '@/services/rest'

interface FindAccountScreenProps {
    onSuccess: (email: string) => void
    email: string
    handleGotoLogin?: () => void
}

type FormData = Pick<SchemaType, 'email'>
const FormSchema = schema.pick(['email'])

function FindAccountScreen({ onSuccess, email, handleGotoLogin }: FindAccountScreenProps) {
    const methods = useForm<FormData>({
        defaultValues: { email },
        resolver: yupResolver(FormSchema),
        mode: 'onBlur'
    })

    const { formState, handleSubmit, setError } = methods
    const { isValid } = formState

    const { mutate, isPending } = useMutation({
        mutationFn: authApi.findAccount,
        onSuccess: (res) => onSuccess(res.data.data.user.email),
        onError: (error) => handleFormError<FormData>(error, setError)
    })

    const handleFindAccount = handleSubmit((data) => {
        mutate({ email: data.email })
    })

    return (
        <View style={styles.centerContainer}>
            <Text style={styles.headerText}>Find Your Account</Text>
            <Text style={styles.descriptionText}>Enter your FitnessX email linked to your account.</Text>

            <FormProvider {...methods}>
                <View style={styles.formWrapper}>
                    <View style={styles.inputWrapper}>
                        <TextInputCustom
                            name='email'
                            type='default'
                            icon='messageIcon'
                            returnKeyType='done'
                            onSubmitEditing={handleFindAccount}
                        />
                    </View>

                    <GradientButton
                        activeOpacity={0.8}
                        containerStyle={styles.btnNext}
                        Square
                        disabled={!isValid}
                        isLoading={isPending}
                        onPress={handleFindAccount}
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
        fontWeight: '600',
        textAlign: 'center'
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
        width: '100%',
        height: 50,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    },
    divideLine: {
        width: SCREEN_WIDTH * 0.9,
        marginTop: 29,
        height: 1,
        backgroundColor: '#DDDADA',
        position: 'relative'
    },
    ORtextWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: -8 }],
        backgroundColor: '#fff',
        paddingHorizontal: 8
    },
    textOr: {
        color: '#1D1617',
        fontSize: 12,
        fontWeight: '400'
    },
    otherOptionsWrapper: {
        marginTop: 29,
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})

import { useForm, FormProvider } from 'react-hook-form'
import Icon from 'react-native-vector-icons/FontAwesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, Pressable } from 'react-native'
import { SCREEN_WIDTH } from '@/src/constants/devices.constant'
import MyIcon from '@/src/components/Icon'
import GradientButton from '@/src/components/GradientButton'
import TextGradient from '@/src/components/TextGradient'
import { schema, SchemaType } from '@/src/utils/rules.util'
import TextInputCustom from '@/src/components/TextInput'
import Loader from '@/src/components/LoaderModal'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from '@/src/Contexts/App.context'
import handleFormError from '@/src/utils/handleFormError'
import { RootStackScreenProps } from '@/src/navigation/types'

type FormData = Pick<SchemaType, 'email' | 'password'>
const FormSchema = schema.pick(['email', 'password'])
function Login({ navigation }: RootStackScreenProps<'Login'>) {
    const { setAuthenticated, setProfile } = useContext(AppContext)
    const { ...methods } = useForm<FormData>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(FormSchema),
        mode: 'onBlur'
    })
    const loginMutation = useMutation({
        mutationFn: authApi.login
    })
    const canSubmit = methods.formState.isValid
    const handleRegister = () => {
        navigation.push('RegisterStep1')
    }
    const handleForgotPassword = () => {
        navigation.push('ForgotPassword')
    }
    const onSubmit = methods.handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setAuthenticated(true)
                setProfile(data.data.data.user)
            },
            onError: (error) => handleFormError<FormData>(error, methods.setError)
        })
    })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screenWrapper}>
                {loginMutation.isPending && <Loader title='Logging in' />}
                <View style={styles.Container}>
                    <View style={styles.ContainerTop}>
                        <View style={styles.callToAction}>
                            <Text style={styles.callToAction__desc}>Hey there,</Text>
                            <Text style={styles.callToAction__heading}>Welcome Back</Text>
                        </View>
                        <FormProvider {...methods}>
                            <View style={styles.loginForm}>
                                <View style={styles.rowForm}>
                                    <TextInputCustom
                                        icon='messageIcon'
                                        type='default'
                                        autoCapitalize='none'
                                        placeholder='Email'
                                        name='email'
                                    />
                                </View>
                                <View style={styles.rowForm}>
                                    <TextInputCustom
                                        icon='lockIcon'
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                    />
                                </View>

                                <View>
                                    <Text style={styles.linkText} onPress={handleForgotPassword}>
                                        Forgot your password?
                                    </Text>
                                </View>
                            </View>
                        </FormProvider>
                    </View>
                    <View style={styles.ContainerBottom}>
                        <GradientButton
                            style={[styles.btnLogin, { opacity: canSubmit ? 1 : 0.6 }]}
                            disabled={!canSubmit}
                            onPress={onSubmit}
                            Square
                        >
                            <MyIcon name='loginIcon' />
                            <Text style={styles.btnText}>Login</Text>
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
                        </View>
                        <Pressable style={styles.registerWrapper} onPress={handleRegister}>
                            <Text style={styles.callToAction__desc}>Don’t have an account yet?</Text>
                            <TextGradient style={styles.strongText} text=' Register' />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Login

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: '#FFF',
        flex: 1
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ContainerTop: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    ContainerBottom: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    callToAction: {
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 15
    },
    callToAction__heading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30
    },
    callToAction__desc: {
        color: '#1D1617',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    loginForm: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    rowForm: {
        position: 'relative',
        width: '100%',
        marginVertical: 15
    },
    linkText: {
        color: '#ADA4A5',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18,
        textDecorationLine: 'underline',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    strongText: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 21
    },
    btnLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7.5,
        width: SCREEN_WIDTH * 0.9,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnText: {
        marginLeft: 12,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    },
    otherOptionsWrapper: {
        marginTop: 29,
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
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
    forgotPassword: {
        width: SCREEN_WIDTH * 0.8,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
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
    registerWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

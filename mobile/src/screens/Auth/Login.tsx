import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, Pressable } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/Devices.constant'
import MyIcon from '@/src/components/Icon'
import GradientButton from '@/src/components/GradientButton'
import TextGradient from '@/src/components/TextGradient'
import { schema, SchemaType } from '@/src/utils/rules.util'
import TextInputCustom from '@/src/components/TextInput'
import Loader from '@/src/components/Loader'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from '@/src/Contexts/App.context'
type FormData = Pick<SchemaType, 'email' | 'password'>
const FormSchema = schema.pick(['email', 'password'])
function Login() {
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
    const handleRegister = () => {}
    const handleForgotPassword = () => {}
    const onSubmit = methods.handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setAuthenticated(true)
                setProfile(data.data.data.user)
            }
        })
    })
    return (
        <SafeAreaView style={styles.container}>
            {loginMutation.isPending && <Loader title='Logging in' />}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
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
                        >
                            <MyIcon name='loginIcon' />
                            <Text style={styles.btnText}>Login</Text>
                        </GradientButton>
                        <Pressable style={styles.registerWrapper} onPress={handleRegister}>
                            <Text style={styles.callToAction__desc}>Don’t have an account yet?</Text>
                            <TextGradient style={styles.strongText} text=' Register' />
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: SCREEN_HEIGHT,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    ContainerTop: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        marginBottom: 285
    },
    ContainerBottom: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        marginBottom: 40,
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
        marginBottom: 29,
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
        width: SCREEN_WIDTH * 0.9,
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
        marginVertical: 10,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd'
    },
    ORtextWrapper: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH * 0.9 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    registerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

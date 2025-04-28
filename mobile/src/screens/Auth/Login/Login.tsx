import { useContext } from 'react'
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { AppContext } from '@/Contexts/App.context'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { schema, SchemaType } from '@/utils/rules.util'
import handleFormError from '@/utils/handleFormError'
import { RootStackScreenProps } from '@/navigation/types'
import { authApi } from '@/services/rest'

import MyIcon from '@/components/Icon'
import GradientButton from '@/components/GradientButton'
import TextGradient from '@/components/TextGradient'
import TextInputCustom from '@/components/TextInput'

type FormData = Pick<SchemaType, 'email' | 'password'>
const formSchema = schema.pick(['email', 'password'])

function Login({ navigation }: RootStackScreenProps<'Login'>) {
    const { setAuthenticated, setProfile } = useContext(AppContext)

    const methods = useForm<FormData>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(formSchema)
    })

    const { handleSubmit, setError, formState } = methods

    const loginMutation = useMutation({
        mutationFn: authApi.login
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: ({ data }) => {
                setAuthenticated(true)
                setProfile(data.data.user)
            },
            onError: (error) => handleFormError<FormData>(error, setError)
        })
    })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.screenWrapper}>
                <View style={styles.container}>
                    {/* Top Section */}
                    <View style={styles.containerTop}>
                        <View style={styles.callToAction}>
                            <Text style={styles.callToAction__desc}>Hey there,</Text>
                            <Text style={styles.callToAction__heading}>Welcome Back</Text>
                        </View>

                        <FormProvider {...methods}>
                            <View style={styles.loginForm}>
                                <View style={styles.rowForm}>
                                    <TextInputCustom
                                        {...methods.register('email')}
                                        icon='messageIcon'
                                        type='default'
                                        autoCapitalize='none'
                                        placeholder='Email'
                                        name='email'
                                        returnKeyType='next'
                                        onSubmitEditing={() => {
                                            methods.setFocus('password')
                                        }}
                                    />
                                </View>
                                <View style={styles.rowForm}>
                                    <TextInputCustom
                                        {...methods.register('password')}
                                        icon='lockIcon'
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                        returnKeyType='done'
                                        onSubmitEditing={onSubmit}
                                    />
                                </View>
                                <Text style={styles.linkText} onPress={() => navigation.push('ForgotPassword')}>
                                    Forgot your password?
                                </Text>
                            </View>
                        </FormProvider>
                    </View>

                    {/* Bottom Section */}
                    <View style={styles.containerBottom}>
                        <GradientButton
                            style={styles.btnLogin}
                            disabled={!formState.isValid}
                            onPress={onSubmit}
                            Square
                            isLoading={loginMutation.isPending}
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

                        <Pressable style={styles.registerWrapper} onPress={() => navigation.push('CreateAccount')}>
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
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    },
    containerTop: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    callToAction: {
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 15
    },
    callToAction__heading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1D1617',
        lineHeight: 30
    },
    callToAction__desc: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1D1617',
        lineHeight: 24
    },
    loginForm: {
        width: SCREEN_WIDTH * 0.9,
        marginTop: 30,
        alignItems: 'center'
    },
    rowForm: {
        width: '100%',
        marginVertical: 15
    },
    linkText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#ADA4A5',
        textDecorationLine: 'underline'
    },
    containerBottom: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    btnLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9,
        marginTop: 7.5,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnText: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 24
    },
    divideLine: {
        width: SCREEN_WIDTH * 0.9,
        height: 1,
        marginTop: 29,
        backgroundColor: '#DDDADA',
        position: 'relative'
    },
    ORtextWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: -10 }],
        backgroundColor: '#FFF',
        paddingHorizontal: 10
    },
    textOr: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1D1617'
    },
    otherOptionsWrapper: {
        marginTop: 29,
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
    registerWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    strongText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21
    }
})

import { useCallback } from 'react'
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { RootStackScreenProps } from '@/navigation/types'

import Header from './Components/Header'
import LoginForm from './Components/LoginForm/LoginForm'
import Footer from './Components/Footer'
import useAuth from '@/hooks/useAuth'

function Login({ navigation }: RootStackScreenProps<'Login'>) {
    const { emailPassword, facebook } = useAuth()
    const { handleLogin, loginMutation, methods } = emailPassword
    const { loginWithFacebook } = facebook

    const handleGoToForgotPassword = useCallback(() => {
        navigation.push('ForgotPassword')
    }, [navigation])

    const handleGoToRegister = useCallback(() => {
        navigation.replace('Register')
    }, [navigation])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.screenWrapper}>
                <View style={styles.container}>
                    <Header />

                    <LoginForm methods={methods} onSubmit={handleLogin} goToForgotPassword={handleGoToForgotPassword} />

                    <Footer
                        goToRegister={handleGoToRegister}
                        onSubmit={handleLogin}
                        loginWithFacebook={loginWithFacebook}
                        formState={methods.formState.isValid}
                        isLoginIn={loginMutation.isPending}
                    />
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
    }
})

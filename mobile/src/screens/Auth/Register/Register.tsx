import { SafeAreaView, TouchableWithoutFeedback, Keyboard, View, StyleSheet } from 'react-native'
import { FormProvider } from 'react-hook-form'
import useRegister from '@/hooks/useRegister'
import { RootStackScreenProps } from '@/navigation/types'
import Header from './Components/Header'
import Footer from './Components/Footer'
import RegisterForm from './Components/RegisterForm'

function Register({ navigation }: RootStackScreenProps<'Register'>) {
    const { handleRegister, registerMutation, methods } = useRegister()

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerCenterScreen}>
                    <Header />
                    <FormProvider {...methods}>
                        <RegisterForm onSubmit={handleRegister} />
                    </FormProvider>
                    <Footer
                        isValid={methods.formState.isValid}
                        isLoading={registerMutation.isPending}
                        onSubmit={handleRegister}
                        goToLogin={() => navigation.navigate('Login')}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    },
    containerCenterScreen: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    }
})

export default Register

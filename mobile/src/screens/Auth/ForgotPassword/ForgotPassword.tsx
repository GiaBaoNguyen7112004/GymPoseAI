import { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

import NavigationBar from '@/components/NavigationBar'
import FindAccountScreen from './Screens/FindAccountScreen'
import VerificationScreen from './Screens/VerificationScreen'
import NewPasswordScreen from './Screens/NewPasswordScreen'

import { RootStackScreenProps } from '@/navigation/types'

export interface ForgotPasswordPayload {
    email: string
    otp: string
}

const ForgotPassword = ({ navigation }: RootStackScreenProps<'ForgotPassword'>) => {
    const [screenStep, setScreenStep] = useState<1 | 2 | 3>(1)
    const [formData, setFormData] = useState<ForgotPasswordPayload>({ email: '', otp: '' })

    const handleBackScreen = () => {
        if (screenStep === 1) {
            navigation.goBack()
        } else {
            setScreenStep((prev) => (prev - 1) as 1 | 2 | 3)
        }
    }

    const handleFindAccountSuccess = (email: string) => {
        if (email.trim() != '') setScreenStep(2)
        setFormData((prev) => {
            return { ...prev, email }
        })
    }

    const handleVerifySuccess = (otp: string) => {
        if (otp.trim() != '') setScreenStep(3)
        setFormData((prev) => {
            return { ...prev, otp }
        })
    }

    const handleGotoLoginWithFitnessX = () => {
        navigation.navigate('Login')
    }

    const handleRegister = () => {
        navigation.navigate('CreateAccount')
    }
    const getScreenName = () => {
        if (screenStep == 1) return 'Forgot Password'
        if (screenStep == 2) return 'Verification'
        return ''
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.navigationBar}>
                    <NavigationBar title={getScreenName()} callback={handleBackScreen} />
                </View>

                {screenStep === 1 && (
                    <FindAccountScreen
                        onSuccess={handleFindAccountSuccess}
                        email={formData.email}
                        handleGotoLogin={handleGotoLoginWithFitnessX}
                    />
                )}
                {screenStep === 2 && (
                    <VerificationScreen
                        email={formData.email}
                        onSuccess={handleVerifySuccess}
                        onSingUp={handleRegister}
                    />
                )}
                {screenStep === 3 && (
                    <NewPasswordScreen
                        email={formData.email}
                        otp={formData.otp}
                        onSuccess={handleGotoLoginWithFitnessX}
                    />
                )}

                <TouchableOpacity activeOpacity={1} style={styles.bottomHelp}>
                    <Text style={{ color: '#318bfb' }}>Need more help?</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    navigationBar: {
        marginTop: 5
    },
    bottomHelp: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

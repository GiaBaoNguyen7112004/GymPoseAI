import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/devices.constant'
import GradientButton from '@/components/GradientButton'
import TextGradient from '@/components/TextGradient'
import { Pressable } from 'react-native-gesture-handler'
import { schema, SchemaType } from '@/utils/rules.util'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInputCustom from '@/components/TextInput'
import CheckInput from '@/components/CheckInput'
import { RootStackScreenProps } from '@/navigation/types'

type FormData = Pick<SchemaType, 'email' | 'first_name' | 'last_name' | 'password' | 'policy'>

const FormSchema = schema.pick(['email', 'password', 'first_name', 'last_name', 'policy'])

function CreateAccount({ navigation }: RootStackScreenProps<'CreateAccount'>) {
    const { ...methods } = useForm<FormData>({
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            policy: false
        },
        resolver: yupResolver(FormSchema),
        mode: 'onBlur'
    })
    const canSubmit = methods.formState.isValid
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.replace('CompleteProfile')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.containerCenterScreen}>
                        <View>
                            <View style={styles.callToAction}>
                                <Text style={styles.callToAction__desc}>Hey there,</Text>
                                <Text style={styles.callToAction__heading}>Create an Account</Text>
                            </View>
                            <FormProvider {...methods}>
                                <View style={styles.registerForm}>
                                    <View style={styles.rowForm}>
                                        <TextInputCustom
                                            type='default'
                                            icon='profileIcon'
                                            autoCapitalize='none'
                                            placeholder='First Name'
                                            name='first_name'
                                        />
                                    </View>
                                    <View style={styles.rowForm}>
                                        <TextInputCustom
                                            type='default'
                                            icon='profileIcon'
                                            autoCapitalize='none'
                                            placeholder='Last Name'
                                            name='last_name'
                                        />
                                    </View>
                                    <View style={styles.rowForm}>
                                        <TextInputCustom
                                            type='default'
                                            icon='messageIcon'
                                            placeholder='Email'
                                            name='email'
                                        />
                                    </View>
                                    <View style={styles.rowForm}>
                                        <TextInputCustom
                                            type='password'
                                            icon='lockIcon'
                                            placeholder='Password'
                                            name='password'
                                        />
                                    </View>
                                    <View style={styles.rowForm}>
                                        <CheckInput
                                            label=' By continuing you accept our Privacy Policy and Term of Use'
                                            name='policy'
                                        />
                                    </View>
                                </View>
                            </FormProvider>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <GradientButton
                                onPress={handleRegister}
                                activeOpacity={0.6}
                                Square
                                disabled={!canSubmit}
                                style={{
                                    ...styles.btnRegister,
                                    opacity: canSubmit ? 1 : 0.6
                                }}
                            >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Register</Text>
                            </GradientButton>
                            <Pressable style={styles.loginWrapper} onPress={handleLogin}>
                                <Text style={styles.callToAction__desc}>Already have an account?</Text>
                                <TextGradient style={styles.strongText} text='  Login' />
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: SCREEN_HEIGHT,
        flex: 1
    },
    containerCenterScreen: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    callToAction: {
        marginTop: 30,
        alignItems: 'center'
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
    registerForm: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    rowForm: {
        position: 'relative',
        width: '100%',
        marginVertical: 10
    },
    btnRegister: {
        marginTop: 7.5,
        width: SCREEN_WIDTH * 0.9,
        shadowColor: 'green',
        shadowOffset: { width: 0, height: 1000 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },

    loginWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    strongText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21
    }
})

export default CreateAccount

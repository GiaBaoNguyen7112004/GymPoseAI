import { View, StyleSheet } from 'react-native'
import { useFormContext } from 'react-hook-form'
import TextInputCustom from '@/components/TextInput'
import CheckInput from '@/components/CheckInput'
import { ScrollView } from 'react-native-gesture-handler'
import { useKeyboard } from '@/hooks/useKeyboard'
import { SCREEN_WIDTH } from '@/constants/devices.constant'

const RegisterForm = ({ onSubmit }: { onSubmit: () => void }) => {
    const { register, setFocus } = useFormContext()
    const { isKeyboardVisible } = useKeyboard()

    return (
        <ScrollView style={styles.registerForm} enabled={isKeyboardVisible}>
            <View style={styles.rowForm}>
                <TextInputCustom
                    {...register('first_name')}
                    placeholder='First Name'
                    name='first_name'
                    icon='profileIcon'
                    onSubmitEditing={() => setFocus('last_name')}
                />
            </View>
            <View style={styles.rowForm}>
                <TextInputCustom
                    {...register('last_name')}
                    placeholder='Last Name'
                    name='last_name'
                    icon='profileIcon'
                    onSubmitEditing={() => setFocus('email')}
                />
            </View>
            <View style={styles.rowForm}>
                <TextInputCustom
                    {...register('email')}
                    placeholder='Email'
                    name='email'
                    icon='messageIcon'
                    onSubmitEditing={() => setFocus('password')}
                />
            </View>
            <View style={styles.rowForm}>
                <TextInputCustom
                    {...register('password')}
                    placeholder='Password'
                    name='password'
                    type='password'
                    icon='lockIcon'
                    onSubmitEditing={onSubmit}
                />
            </View>
            <View style={styles.rowForm}>
                <CheckInput label='By continuing you accept our Privacy Policy and Term of Use' name='policy' />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    registerForm: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        flex: 1
    },
    rowForm: {
        width: '100%',
        marginVertical: 10
    }
})

export default RegisterForm

import { Pressable, Text, View, StyleSheet } from 'react-native'
import GradientButton from '@/components/GradientButton'
import TextGradient from '@/components/TextGradient'
import { SCREEN_WIDTH } from '@/constants/devices.constant'

interface FooterProps {
    isValid: boolean
    isLoading: boolean
    onSubmit: () => void
    goToLogin: () => void
}

const Footer = ({ isValid, isLoading, onSubmit, goToLogin }: FooterProps) => (
    <View style={styles.wrapper}>
        <GradientButton onPress={onSubmit} disabled={!isValid} Square isLoading={isLoading} style={styles.btnRegister}>
            <Text style={styles.btnText}>Register</Text>
        </GradientButton>
        <Pressable style={styles.loginWrapper} onPress={goToLogin}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TextGradient style={styles.strongText} text='  Login' />
        </Pressable>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center'
    },
    btnRegister: {
        marginTop: 7.5,
        width: SCREEN_WIDTH * 0.9,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500'
    },
    loginWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1D1617'
    },
    strongText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21
    }
})

export default Footer

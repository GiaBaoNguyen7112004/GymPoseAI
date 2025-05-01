import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import GradientButton from '@/components/GradientButton'
import TextGradient from '@/components/TextGradient'
import MyIcon from '@/components/Icon'
import { SCREEN_WIDTH } from '@/constants/devices.constant'

interface FooterProps {
    goToRegister: () => void
    onSubmit: () => void
    formState: boolean
    isLoginIn: boolean
}

const Footer = ({ goToRegister, onSubmit, formState, isLoginIn }: FooterProps) => {
    return (
        <View style={styles.container}>
            <GradientButton
                style={styles.loginButton}
                disabled={!formState}
                onPress={onSubmit}
                Square
                isLoading={isLoginIn}
            >
                <MyIcon name='loginIcon' />
                <Text style={styles.loginText}>Login</Text>
            </GradientButton>

            <View style={styles.divider}>
                <View style={styles.orWrapper}>
                    <Text style={styles.orText}>OR</Text>
                </View>
            </View>

            <View style={styles.socialWrapper}>
                <Pressable style={styles.socialButton}>
                    <Icon name='facebook-f' size={20} color='#1877F2' />
                </Pressable>
            </View>

            <Pressable style={styles.registerWrapper} onPress={goToRegister}>
                <Text style={styles.registerDesc}>Don’t have an account yet?</Text>
                <TextGradient style={styles.registerStrong} text=' Register' />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    loginButton: {
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
    loginText: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 24
    },
    divider: {
        width: SCREEN_WIDTH * 0.9,
        height: 1,
        marginTop: 29,
        backgroundColor: '#DDDADA',
        position: 'relative'
    },
    orWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: -10 }],
        backgroundColor: '#FFF',
        paddingHorizontal: 10
    },
    orText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1D1617'
    },
    socialWrapper: {
        marginTop: 29,
        alignItems: 'center'
    },
    socialButton: {
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
    registerDesc: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1D1617',
        lineHeight: 24
    },
    registerStrong: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21
    }
})

export default React.memo(Footer)

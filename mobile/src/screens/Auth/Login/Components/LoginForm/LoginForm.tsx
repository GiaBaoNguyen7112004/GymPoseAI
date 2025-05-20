import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import TextInputCustom from '@/components/TextInput'
import { SCREEN_WIDTH } from '@/constants/devices.constant'

interface LoginFormProps {
    methods: UseFormReturn<any>
    onSubmit: () => void
    goToForgotPassword: () => void
}

const LoginForm = ({ methods, onSubmit, goToForgotPassword }: LoginFormProps) => (
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
                    onSubmitEditing={() => methods.setFocus('password')}
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
            <Text style={styles.linkText} onPress={goToForgotPassword}>
                Forgot your password?
            </Text>
        </View>
    </FormProvider>
)

const styles = StyleSheet.create({
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
        textDecorationLine: 'underline',
        padding: 10
    }
})

export default memo(LoginForm)

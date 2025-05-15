import React from 'react'
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native'

interface KeyboardDismissWrapperProps {
    children: React.ReactNode
    style?: object
    behavior?: 'height' | 'padding' | 'position'
    keyboardVerticalOffset?: number
}

const KeyboardDismissWrapper: React.FC<KeyboardDismissWrapperProps> = ({
    children,
    style,
    behavior = Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                style={[styles.wrapper, style]}
                behavior={behavior}
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <View style={{ flex: 1 }}>{children}</View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})

export default KeyboardDismissWrapper

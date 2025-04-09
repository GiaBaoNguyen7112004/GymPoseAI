import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StyleProp, TextStyle } from 'react-native'
import Icon from '../Icon'
import { Ionicons } from '@expo/vector-icons'
export interface NavigationBarProps {
    title: string
    callback?: () => any
    headingStyle?: StyleProp<TextStyle>
    buttonBackStyle?: StyleProp<TextStyle>
    iconColor?: string
}
const NavigationBar = ({ callback, title, headingStyle, buttonBackStyle, iconColor }: NavigationBarProps) => {
    const _onCallBack = () => {
        if (callback) callback()
    }
    return (
        <View style={styles.navigationBar}>
            <TouchableOpacity onPress={_onCallBack} style={[styles.btnBack, buttonBackStyle]}>
                <Ionicons name='chevron-back' size={20} color={iconColor} />
            </TouchableOpacity>
            <Text style={[styles.title, headingStyle]}>{title}</Text>
        </View>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: 32,
        paddingHorizontal: 29,
        alignItems: 'center',
        position: 'relative'
    },
    btnBack: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        position: 'absolute',
        left: 29,
        top: 0,
        zIndex: 1
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#1D1617',
        textAlign: 'center'
    }
})

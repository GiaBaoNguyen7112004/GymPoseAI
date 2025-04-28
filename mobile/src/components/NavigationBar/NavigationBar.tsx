import React, { memo, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable, StyleProp, TextStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export interface NavigationBarProps {
    title: string
    callback?: () => any
    headingStyle?: StyleProp<TextStyle>
    buttonBackStyle?: StyleProp<TextStyle>
    iconColor?: string
}

const NavigationBar: React.FC<NavigationBarProps> = ({ callback, title, headingStyle, buttonBackStyle, iconColor }) => {
    const handleBackPress = useCallback(() => {
        if (callback) callback()
    }, [callback])

    return (
        <View style={styles.navigationBar}>
            <Pressable onPress={handleBackPress} style={[styles.btnBack, buttonBackStyle]}>
                <Ionicons name='chevron-back' size={20} color={iconColor} />
            </Pressable>
            <Text style={[styles.title, headingStyle]}>{title}</Text>
        </View>
    )
}

export default memo(NavigationBar)

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

import React, { memo, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable, StyleProp, TextStyle } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'

export interface NavigationBarProps {
    title: string
    callback?: () => any
    headingStyle?: StyleProp<TextStyle>
    buttonBackStyle?: StyleProp<TextStyle>
    iconColor?: string
    handleMorePress?: () => void
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    callback,
    title,
    headingStyle,
    buttonBackStyle,
    iconColor,
    handleMorePress
}) => {
    const handleBackPress = useCallback(() => {
        if (callback) callback()
    }, [callback])

    return (
        <View style={styles.navigationBar}>
            <Pressable onPress={handleBackPress} style={[styles.btnBack, buttonBackStyle]}>
                <Ionicons name='chevron-back' size={20} color={iconColor} />
            </Pressable>
            <Text style={[styles.title, headingStyle]}>{title}</Text>
            {handleMorePress && (
                <Pressable onPress={handleMorePress} style={[styles.btnBack, buttonBackStyle]}>
                    <Feather name='more-horizontal' size={20} color={iconColor} />
                </Pressable>
            )}
        </View>
    )
}

export default memo(NavigationBar)

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 29,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    btnBack: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 8
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

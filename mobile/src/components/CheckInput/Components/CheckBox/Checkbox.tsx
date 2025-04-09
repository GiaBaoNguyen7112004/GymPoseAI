import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CustomCheckboxProps {
    size?: number
    color?: string
    value: boolean
    onChange: (newValue: boolean) => void
    icon?: string
    ColorIcon?: string
    onBlur: () => void
}

function CustomCheckbox({
    size = 16,
    color = '#1877F2',
    value,
    onChange,
    icon = 'check',
    ColorIcon = '#fff',
    onBlur
}: CustomCheckboxProps) {
    return (
        <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => {
                onChange(!value)
                onBlur()
            }}
        >
            <View style={[styles.checkbox, value && { backgroundColor: color, borderColor: color }]}>
                {value && <Icon name={icon} size={size / 1.5} color={ColorIcon} />}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 16,
        minHeight: 16
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.8,
        borderColor: '#ADA4A5',
        backgroundColor: '#FFF'
    }
})

export default CustomCheckbox

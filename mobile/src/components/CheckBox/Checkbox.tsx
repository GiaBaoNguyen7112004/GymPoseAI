import React, { useState, useCallback, useMemo } from 'react'
import { View, TouchableOpacity, StyleSheet, NativeSyntheticEvent, TargetedEvent } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CustomCheckboxProps {
    size?: number
    color?: string
    initialChecked?: boolean
    onValueChange?: (newValue: boolean) => void
    onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
    icon?: string
    ColorIcon?: string
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    size = 16,
    color = '#1877F2',
    initialChecked = false,
    onValueChange,
    icon = 'check',
    ColorIcon = '#fff',
    onBlur
}) => {
    const [checked, setChecked] = useState(initialChecked)

    const handleClick = useCallback(() => {
        const newValue = !checked
        setChecked(newValue)
        if (onValueChange) {
            onValueChange(newValue)
        }
    }, [checked, onValueChange])

    const checkboxStyles = useMemo(
        () =>
            StyleSheet.create({
                checkbox: {
                    width: size,
                    height: size,
                    borderRadius: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.8,
                    borderColor: '#ADA4A5',
                    backgroundColor: '#FFF'
                },
                checked: {
                    backgroundColor: color,
                    borderColor: color
                }
            }),
        [size, color]
    )

    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleClick} onBlur={onBlur}>
            <View style={[checkboxStyles.checkbox, checked && checkboxStyles.checked]}>
                {checked && <Icon name={icon} size={size / 1.5} color={ColorIcon} />}
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
    }
})

export default CustomCheckbox

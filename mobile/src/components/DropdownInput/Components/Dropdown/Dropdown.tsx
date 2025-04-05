import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown'
import { DropdownItem } from '@/src/types/common.type'
import Icon, { IconName } from '@/src/components/Icon/Icon'

export interface CustomDropdownProps {
    data: DropdownItem[]
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    iconSource?: IconName
    containerStyle?: StyleProp<ViewStyle>
    dropdownStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    onPress?: (event: GestureResponderEvent) => void
    onblur?: () => void
}

function CustomDropdown({
    data,
    placeholder = 'Select an option',
    value,
    onChange,
    iconSource,
    containerStyle,
    dropdownStyle,
    textStyle,
    onblur
}: CustomDropdownProps) {
    const dropdownRef = useRef<IDropdownRef>(null)
    const showDropdown = () => {
        dropdownRef.current?.open()
    }
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={showDropdown}>
            {iconSource && <Icon name={iconSource} size={18} style={styles.icon} />}
            <Dropdown
                ref={dropdownRef}
                containerStyle={[styles.containerList]}
                itemContainerStyle={[styles.item]}
                style={[styles.dropdown, dropdownStyle]}
                placeholderStyle={[styles.placeholderStyle, textStyle]}
                selectedTextStyle={[styles.selectedTextStyle, textStyle]}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder={placeholder}
                searchPlaceholder='Search...'
                value={value}
                onChange={(item: DropdownItem) => {
                    if (onChange) onChange(item.value)
                }}
                closeModalWhenSelectedItem
                onBlur={onblur}
                mode='auto'
            />
        </TouchableOpacity>
    )
}

export default CustomDropdown

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexShrink: 0,
        borderRadius: 5,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerList: {
        borderRadius: 14
    },
    dropdown: {
        flex: 1
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#ADA4A5'
    },
    item: {},
    selectedTextStyle: {
        fontSize: 16,
        color: '#000'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 14
    },
    icon: {
        marginRight: 10
    }
})

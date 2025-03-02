import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown'
import { Icon } from '../Icon'
import { IconName } from '../Icon/Icon'

export interface DropdownItem {
    label: string
    value: string
}

interface CustomDropdownProps {
    data: DropdownItem[]
    placeholder?: string
    selectedValue?: string
    onSelect: (value: string) => void
    iconSource?: IconName
    containerStyle?: StyleProp<ViewStyle>
    dropdownStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    onPress?: (event: GestureResponderEvent) => void
    onblur?: () => void
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    data,
    placeholder = 'Select an option',
    selectedValue,
    onSelect,
    iconSource,
    containerStyle,
    dropdownStyle,
    textStyle,
    onPress,
    onblur
}) => {
    const dropdownRef = useRef<IDropdownRef>(null)
    const [value, setValue] = useState<string | undefined>(selectedValue)

    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={(e) => {
                dropdownRef.current?.open()
                if (onPress) {
                    onPress(e)
                }
            }}
        >
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
                onChange={(item) => {
                    setValue(item.value)
                    onSelect(item.value)
                }}
                closeModalWhenSelectedItem
                onBlur={onblur}
                mode='modal'
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

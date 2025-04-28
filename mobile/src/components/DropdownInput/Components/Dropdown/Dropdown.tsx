import React, { memo, useRef, useCallback, useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
    ImageStyle
} from 'react-native'
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown'
import Icon from '@/components/Icon/Icon'
import { IconName } from '@/constants/icon.constants'

export interface DropdownItem {
    label: string
    value: string
}

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
    iconStyle?: StyleProp<ImageStyle>
    itemStyle?: StyleProp<ViewStyle>
    itemTextStyle?: StyleProp<TextStyle>
    containerDropdownStyle?: StyleProp<ViewStyle>
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
    onblur,
    iconStyle,
    itemStyle,
    itemTextStyle,
    containerDropdownStyle
}: CustomDropdownProps) {
    const dropdownRef = useRef<IDropdownRef>(null)

    const showDropdown = useCallback(() => {
        dropdownRef.current?.open()
    }, [])

    const handleChange = useCallback(
        (item: DropdownItem) => {
            if (onChange) {
                onChange(item.value)
            }
        },
        [onChange]
    )

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={showDropdown}>
            {iconSource && <Icon name={iconSource} size={18} style={styles.icon} />}

            <Dropdown
                ref={dropdownRef}
                containerStyle={
                    containerDropdownStyle ? [styles.containerList, containerDropdownStyle] : styles.containerList
                }
                itemContainerStyle={itemStyle ? [styles.item, itemStyle] : styles.item}
                style={dropdownStyle ? [styles.dropdown, dropdownStyle] : styles.dropdown}
                placeholderStyle={textStyle ? [styles.placeholderStyle, textStyle] : styles.placeholderStyle}
                selectedTextStyle={textStyle ? [styles.selectedTextStyle, textStyle] : styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder={placeholder}
                searchPlaceholder='Search...'
                value={value}
                onChange={handleChange}
                closeModalWhenSelectedItem
                onBlur={() => {
                    if (onblur) onblur()
                }}
                mode='modal'
                dropdownPosition='bottom'
                iconStyle={iconStyle}
                itemTextStyle={itemTextStyle}
            />
        </TouchableOpacity>
    )
}

export default memo(CustomDropdown)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
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
        borderRadius: 14,
        overflow: 'hidden',
        minWidth: 300
    },
    dropdown: {
        flex: 1
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#ADA4A5'
    },
    item: {
        flexShrink: 0
    },
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

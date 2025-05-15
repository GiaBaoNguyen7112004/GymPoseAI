import { useController, UseControllerProps } from 'react-hook-form'
import CustomDropdown, { CustomDropdownProps } from '../Dropdown'
import { StyleSheet, Text, View } from 'react-native'
import { memo } from 'react'

export type ControlledDropdownProps = CustomDropdownProps & UseControllerProps

function ControlledDropdown(props: ControlledDropdownProps) {
    const { name, defaultValue, rules } = props
    const { field, fieldState } = useController({ name, defaultValue, rules })
    const errorMsg = fieldState.error?.message
    return (
        <View style={styles.container}>
            <CustomDropdown {...props} onChange={field.onChange} onblur={field.onBlur} value={field.value} />
            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        </View>
    )
}

export default memo(ControlledDropdown)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexShrink: 0,
        paddingHorizontal: 15,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        bottom: -14,
        left: 10
    }
})

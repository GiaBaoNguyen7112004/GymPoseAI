import CustomCheckbox from '@/components/CheckInput/Components/CheckBox'
import { memo } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

export interface ControlledCheckBoxProps extends UseControllerProps {
    label: string
}

function ControlledCheckBox({ label, name, rules, defaultValue }: ControlledCheckBoxProps) {
    const { field, fieldState } = useController({ name, rules, defaultValue })
    const errorMessage = fieldState.error?.message
    return (
        <View style={styles.container}>
            <View style={styles.checkboxWrapper}>
                <CustomCheckbox onChange={field.onChange} value={field.value} onBlur={field.onBlur} />
                <Text style={styles.checkboxText}>{label}</Text>
            </View>
            {errorMessage && <Text style={styles.error_msg}> {errorMessage.toString()}</Text>}
        </View>
    )
}

export default memo(ControlledCheckBox)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'relative'
    },
    checkboxWrapper: {
        flexDirection: 'row',
        marginLeft: 5
    },
    checkboxText: {
        textAlign: 'left',
        marginLeft: 10,
        maxWidth: 224,
        color: '#ADA4A5',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 15
    },
    error_msg: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        bottom: -14,
        left: 10
    }
})

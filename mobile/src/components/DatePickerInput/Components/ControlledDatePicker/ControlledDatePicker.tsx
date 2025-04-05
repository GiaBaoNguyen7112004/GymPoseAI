import { IconName } from '@/src/components/Icon/Icon'
import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import { Text } from 'react-native'
import DatePicker from '@/src/components/DatePickerInput/Components/DatePicker'

export interface ControlledDatePickerProps extends UseControllerProps {
    label: string
    icon: IconName
}

function ControlledDatePicker({ label, icon, name, defaultValue, rules }: ControlledDatePickerProps) {
    const { field, fieldState } = useController({ name, defaultValue, rules })
    const errorMsg = fieldState.error?.message

    return (
        <View style={styles.container}>
            <MyIcon name={icon} size={18} style={styles.icon} />
            <DatePicker label={label} onChange={field.onChange} value={field.value} onBlur={field.onBlur} />
            {errorMsg && <Text style={styles.error_mgs}>{errorMsg}</Text>}
        </View>
    )
}

export default ControlledDatePicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 48,
        flexShrink: 0,
        paddingHorizontal: 15,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    icon: {
        marginRight: 10
    },
    error_mgs: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        bottom: -14,
        left: 10
    }
})

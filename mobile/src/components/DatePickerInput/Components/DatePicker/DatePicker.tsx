import moment from 'moment'
import { useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface DatePickerProps {
    label: string
    onChange: (value: Date) => void
    value: Date
    onBlur?: () => void
}

function DatePicker({ label, value, onChange, onBlur }: DatePickerProps) {
    const [isVisible, setIsVisible] = useState(false)

    const handleConfirm = (selectedDate: Date) => {
        onChange(selectedDate)
        setIsVisible(false)
        onBlur?.()
    }

    return (
        <>
            <Pressable onPress={() => setIsVisible(true)}>
                <Text style={value ? undefined : styles.label}>
                    {value ? moment(value).format('DD/MM/YYYY') : label}
                </Text>
            </Pressable>

            <DateTimePickerModal
                isVisible={isVisible}
                mode='date'
                date={value}
                onConfirm={handleConfirm}
                onCancel={() => setIsVisible(false)}
            />
        </>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    label: {
        color: '#ADA4A5',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18
    }
})

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
    const [isShowDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [datePicked, setDatePicked] = useState<Date | null>(null)
    const handleToggleShowDatePicker = () => {
        setShowDatePicker((pre) => !pre)
    }

    const onConfirmPickedDate = (dateValue: Date) => {
        setDatePicked(dateValue)
        onChange(dateValue)
        setShowDatePicker(false)
        if (onBlur) onBlur()
    }
    return (
        <>
            <Pressable onPress={handleToggleShowDatePicker}>
                {datePicked ? (
                    <Text>{moment(datePicked).format('DD/MM/YYYY')}</Text>
                ) : (
                    <Text style={styles.label}>{label}</Text>
                )}
            </Pressable>
            <DateTimePickerModal
                isVisible={isShowDatePicker}
                mode='date'
                onConfirm={onConfirmPickedDate}
                onCancel={handleToggleShowDatePicker}
                date={value}
            />
        </>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    label: { color: '#ADA4A5', fontSize: 14, fontWeight: '400', lineHeight: 18 }
})

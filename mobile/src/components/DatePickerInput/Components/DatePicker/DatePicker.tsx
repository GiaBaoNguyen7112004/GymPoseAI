import moment from 'moment'
import { memo, useState, useCallback, useMemo } from 'react'
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

    const handleConfirm = useCallback(
        (selectedDate: Date) => {
            onChange(selectedDate)
            setIsVisible(false)
            onBlur?.()
        },
        [onChange, onBlur]
    )

    const formattedDate = useMemo(() => {
        return value ? moment(value).format('DD/MM/YYYY') : label
    }, [value, label])

    const handlePress = useCallback(() => {
        setIsVisible(true)
    }, [])

    return (
        <>
            <Pressable onPress={handlePress}>
                <Text style={value ? undefined : styles.label}>{formattedDate}</Text>
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

export default memo(DatePicker)

const styles = StyleSheet.create({
    label: {
        color: '#ADA4A5',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18
    }
})

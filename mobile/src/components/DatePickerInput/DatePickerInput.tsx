import { useFormContext } from 'react-hook-form'
import ControlledDatePicker, { ControlledDatePickerProps } from './Components/ControlledDatePicker'

function DatePickerInput(props: ControlledDatePickerProps) {
    const { name } = props

    const formContext = useFormContext()

    if (!formContext || !name) {
        const msg = !formContext ? 'DatePickerInput must be wrapped by the FormProvider' : 'Name must be defined'
        console.error(msg)
        return null
    }
    return <ControlledDatePicker {...props} />
}

export default DatePickerInput

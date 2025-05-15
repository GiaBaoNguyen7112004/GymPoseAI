import { useFormContext } from 'react-hook-form'
import ControlledDatePicker, { ControlledDatePickerProps } from './Components/ControlledDatePicker'
import { memo } from 'react'

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

export default memo(DatePickerInput)

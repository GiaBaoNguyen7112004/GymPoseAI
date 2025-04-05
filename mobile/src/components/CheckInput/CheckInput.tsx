import ControlledCheckBox, { ControlledCheckBoxProps } from './Components/ControlledInput'
import { useFormContext } from 'react-hook-form'

function CheckInput(props: ControlledCheckBoxProps) {
    const { name } = props

    const formContext = useFormContext()

    if (!formContext || !name) {
        const msg = !formContext ? 'CheckBoxInput must be wrapped by the FormProvider' : 'Name must be defined'
        console.error(msg)
        return null
    }
    return <ControlledCheckBox {...props} />
}

export default CheckInput

import { useFormContext } from 'react-hook-form'
import ControlledInput, { ControllerInputProps } from './components/ControlledInput'

function TextInputCustom(props: ControllerInputProps) {
    const { name } = props

    const formContext = useFormContext()

    if (!formContext || !name) {
        const msg = !formContext ? 'TextInput must be wrapped by the FormProvider' : 'Name must be defined'
        console.error(msg)
        return null
    }

    return <ControlledInput {...props} />
}
export default TextInputCustom

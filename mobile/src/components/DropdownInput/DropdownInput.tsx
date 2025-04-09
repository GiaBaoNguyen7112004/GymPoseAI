import { useFormContext } from 'react-hook-form'
import ControlledDropdown, { ControlledDropdownProps } from './Components/ControlledDropdown'

function DropdownInput(props: ControlledDropdownProps) {
    const { name } = props
    const formContext = useFormContext()
    if (!formContext || !name) {
        const msg = !formContext ? 'DropdownInput must be wrapped by the FormProvider' : 'Name must be defined'
        console.error(msg)
        return null
    }
    return <ControlledDropdown {...props} />
}

export default DropdownInput

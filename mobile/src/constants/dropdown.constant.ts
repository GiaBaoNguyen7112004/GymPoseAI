import { DropdownItem } from '../components/DropdownInput/Components/Dropdown'

export const DataGender: DropdownItem[] = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
] as const

export const ViewModeDropdown: DropdownItem[] = [
    {
        label: 'Weekly',
        value: 'weekly'
    },
    {
        label: 'Monthly',
        value: 'monthly'
    },
    {
        label: 'Yearly',
        value: 'yearly'
    }
] as const

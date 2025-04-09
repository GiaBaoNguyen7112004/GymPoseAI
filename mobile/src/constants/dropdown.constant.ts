import { DropdownItem } from '../components/DropdownInput/Components/Dropdown'

export const DataGender: DropdownItem[] = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
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

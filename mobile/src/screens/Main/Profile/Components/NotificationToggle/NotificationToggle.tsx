import Switch from '@/components/Switch'
import SettingItem from '../SettingItem'
import { memo } from 'react'

interface Props {
    value: boolean
    onToggle: (value: boolean) => void
}

const NotificationToggle = ({ value, onToggle }: Props) => (
    <SettingItem
        icon='bellGradientOutline'
        label='Pop-up Notification'
        onPress={() => onToggle(!value)}
        rightComponent={<Switch value={value} onValueChange={onToggle} />}
    />
)

export default memo(NotificationToggle)

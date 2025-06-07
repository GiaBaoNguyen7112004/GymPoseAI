import Switch from '@/components/Switch'
import SettingItem from '../SettingItem'
import { memo, useCallback } from 'react'

interface Props {
    value: boolean
    onToggle: (value: boolean) => void
}

const NotificationToggle = ({ value, onToggle }: Props) => {
    const handleToggleNotification = useCallback(() => {
        onToggle(!value)
    }, [value, onToggle])

    return (
        <SettingItem
            noBorderBottom
            icon='bellGradientOutline'
            label='Pop-up Notification'
            onPress={handleToggleNotification}
            rightComponent={<Switch value={value} onValueChange={onToggle} />}
        />
    )
}

export default memo(NotificationToggle)

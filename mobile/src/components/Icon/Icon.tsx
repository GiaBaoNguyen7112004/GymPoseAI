import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'
import SigninIcon from '@/src/assets/Icons/SigninIcon.svg'
import MessageIcon from '@/src/assets/Icons/Message.svg'
import LockIcon from '@/src/assets/Icons/Lock.svg'
import LoginIcon from '@/src/assets/Icons/Login.svg'
import ProfileIcon from '@/src/assets/Icons/Profile.svg'

export type IconName = 'signinIcon' | 'lockIcon' | 'messageIcon' | 'loginIcon' | 'profileIcon'

interface IconProps extends SvgProps {
    name: IconName
    size?: number
}

const Icon: React.FC<IconProps> = ({ name, size = 24, ...props }) => {
    const icons: { [key in IconName]: React.ComponentType<SvgProps> } = useMemo(
        () => ({
            signinIcon: SigninIcon,
            lockIcon: LockIcon,
            messageIcon: MessageIcon,
            loginIcon: LoginIcon,
            profileIcon: ProfileIcon
        }),
        []
    )

    const SelectedIcon = useMemo(() => icons[name], [name, icons])

    return <SelectedIcon height={size} width={size} {...props} />
}

export default Icon

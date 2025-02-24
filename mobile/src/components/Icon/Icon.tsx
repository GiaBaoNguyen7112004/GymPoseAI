import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'
import SigninIcon from '@/src/assets/Icons/SigninIcon.svg'
import MessageIcon from '@/src/assets/Icons/Message.svg'
import LockIcon from '@/src/assets/Icons/Lock.svg'
import LoginIcon from '@/src/assets/Icons/Login.svg'
import ProfileIcon from '@/src/assets/Icons/Profile.svg'
import WelcomeIcon from '@/src/assets/Icons/Welcome.svg'

export type IconName = 'signinIcon' | 'lockIcon' | 'messageIcon' | 'loginIcon' | 'profileIcon' | 'welcomeIcon'

interface IconProps extends SvgProps {
    name: IconName
    size?: number,
    width?:number
}

const Icon: React.FC<IconProps> = ({ name, size = 24, width, ...props }) => {
    const icons: { [key in IconName]: React.ComponentType<SvgProps> } = useMemo(
        () => ({
            signinIcon: SigninIcon,
            lockIcon: LockIcon,
            messageIcon: MessageIcon,
            loginIcon: LoginIcon,
            profileIcon: ProfileIcon,
            welcomeIcon: WelcomeIcon,
        }),
        []
    )

    const SelectedIcon = useMemo(() => icons[name], [name, icons])

    return <SelectedIcon height={size} width={width?width:size} {...props} />
}

export default Icon

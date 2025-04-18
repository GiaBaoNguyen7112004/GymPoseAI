import { ComponentType } from 'react'
import { Flow, ScreenComponentProps } from './routes.config'
import EntryScreen from './EntryScreen'
import UpdateNameScreen from './UpdateNameScreen'
import PreviewAvatarScreen from './PreviewAvatarScreen'

export const screenMap: Record<Flow, ComponentType<ScreenComponentProps> | null> = {
    entry: EntryScreen,
    editName: UpdateNameScreen,
    changeAvatar: PreviewAvatarScreen,
    editProfile: null
} as const

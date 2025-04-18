export type Flow = 'entry' | 'editProfile' | 'editName' | 'changeAvatar'

export type ScreenComponentProps = {
    onNavigate?: (flow: Flow) => void
    onGoBack?: () => void
    onClose?: () => void
}

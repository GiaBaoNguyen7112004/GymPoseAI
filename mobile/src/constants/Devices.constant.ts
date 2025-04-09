import { Dimensions, Platform, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const getStatusBarHeight = () => {
    if (Platform.OS === 'android') return StatusBar.currentHeight || 0
    return 0
}

export const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

export const useStatusBarHeight = () => {
    const insets = useSafeAreaInsets()
    return Platform.OS === 'ios' ? insets.top : getStatusBarHeight()
}

import { useCallback, useState } from 'react'
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

export default function useScrollBorderEffect() {
    const [isScrolled, setIsScrolled] = useState(false)

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setIsScrolled(offsetY > 0)
    }, [])

    return { isScrolled, handleScroll }
}

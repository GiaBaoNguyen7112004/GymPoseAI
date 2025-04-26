import { useState } from 'react'
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

export default function useScrollBorderEffect() {
    const [isScrolled, setIsScrolled] = useState(false)

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setIsScrolled(offsetY > 0)
    }

    return { isScrolled, handleScroll }
}

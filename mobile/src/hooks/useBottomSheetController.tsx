import { AnimatedBottomSheetLayoutRef } from '@/types/components/bottomSheet.type'
import { useCallback, useRef } from 'react'

export default function useBottomSheetController() {
    const bottomSheetRef = useRef<AnimatedBottomSheetLayoutRef>(null)
    const openBottomSheet = useCallback((Content: React.ReactNode) => {
        bottomSheetRef.current?.open(<>{Content}</>)
    }, [])

    const closeBottomSheet = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    return { openBottomSheet, closeBottomSheet, bottomSheetRef }
}

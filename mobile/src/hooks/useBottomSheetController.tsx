import { useCallback } from 'react'
import type { AnimatedBottomSheetLayoutRef } from '@/components/layouts/AnimatedBottomSheetLayout'

export default function useBottomSheetController(bottomSheetRef: React.RefObject<AnimatedBottomSheetLayoutRef>) {
    const openBottomSheet = useCallback((Content: React.ReactNode) => {
        bottomSheetRef.current?.open(<>{Content}</>)
    }, [])

    const closeBottomSheet = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    return { openBottomSheet, closeBottomSheet }
}

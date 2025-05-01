import { Exercise } from '@/types/exercises.type'
import { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'

export function scrollToExerciseById(
    ref: React.RefObject<BottomSheetFlatListMethods>,
    exercises: Exercise[],
    targetId?: string
) {
    if (!targetId || exercises.length === 0 || !ref.current) return

    const index = exercises.findIndex((item) => item.id === targetId)
    if (index === -1) return

    requestAnimationFrame(() => {
        ref.current?.scrollToIndex({ index, animated: true })
    })
}

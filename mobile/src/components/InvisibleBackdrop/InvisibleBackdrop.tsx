import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { memo } from 'react'

function InvisibleBackdrop(props: BottomSheetBackdropProps) {
    return (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={-1}
            disappearsOnIndex={-1}
            pressBehavior='none'
            enableTouchThrough
            style={{ height: 0 }}
        />
    )
}

export default memo(InvisibleBackdrop)

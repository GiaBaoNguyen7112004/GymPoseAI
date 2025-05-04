import { ReactNode } from 'react'

export type AnimatedBottomSheetLayoutRef = {
    open: (content: ReactNode) => void
    close: () => void
}

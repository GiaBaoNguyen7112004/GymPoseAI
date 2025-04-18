import { useCallback, useRef, useState, useImperativeHandle, forwardRef, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, interpolate } from 'react-native-reanimated'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type AnimatedBottomSheetLayoutRef = {
    open: (content: ReactNode) => void
    close: () => void
}

type Props = {
    children: ReactNode
}

const AnimatedBottomSheetLayout = forwardRef<AnimatedBottomSheetLayoutRef, Props>(({ children }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const animatedIndex = useSharedValue(-1)
    const [, setBottomSheetVisible] = useState(false)
    const [content, setContent] = useState<ReactNode>(null)
    const { bottom } = useSafeAreaInsets()

    const onSheetChange = useCallback((index: number) => {
        console.log
        setBottomSheetVisible(index >= 0)
    }, [])

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
        ),
        []
    )

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(animatedIndex.value, [-1, 0], ['#FFF', '#000'])
    }))

    const contentStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: interpolate(animatedIndex.value, [-1, 0], [1, 0.88]) },
            { translateY: interpolate(animatedIndex.value, [-1, 0], [0, 20]) }
        ]
    }))

    useImperativeHandle(ref, () => ({
        open: (newContent: ReactNode) => {
            setContent(newContent)
            bottomSheetRef.current?.present()
        },
        close: () => bottomSheetRef.current?.close()
    }))

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <Animated.View style={[styles.contentWrapper, contentStyle]}>{children}</Animated.View>

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={['90%']}
                enableDynamicSizing={false}
                stackBehavior='push'
                onChange={onSheetChange}
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.sheetBackground}
                handleStyle={styles.sheetHandle}
                animatedIndex={animatedIndex}
                enablePanDownToClose={false}
            >
                <Animated.View style={[styles.sheetContent, { paddingBottom: bottom }]}>{content}</Animated.View>
            </BottomSheetModal>
        </Animated.View>
    )
})

export default AnimatedBottomSheetLayout

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentWrapper: {
        flex: 1
    },
    sheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    sheetHandle: {
        display: 'none'
    },
    sheetContent: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden'
    }
})

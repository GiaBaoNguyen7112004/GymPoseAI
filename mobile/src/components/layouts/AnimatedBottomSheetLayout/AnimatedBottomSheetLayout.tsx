import { useCallback, useRef, useState, useImperativeHandle, forwardRef, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, interpolate } from 'react-native-reanimated'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'

export type AnimatedBottomSheetLayoutRef = {
    open: (content: ReactNode) => void
    close: () => void
}

type Props = {
    children: ReactNode
}

const AnimatedBottomSheetLayout = forwardRef<AnimatedBottomSheetLayoutRef, Props>(({ children }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const animatedIndex = useSharedValue<number>(0)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null)

    const handleSheetChanges = useCallback((index: number) => {
        setIsModalVisible(index >= 0)
    }, [])

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
    )

    const containerAnimationStyle = useAnimatedStyle(() => {
        if (!isModalVisible && animatedIndex.value == 0) return {}
        return {
            backgroundColor: interpolateColor(animatedIndex.value, [-1, 0], ['#FFF', '#000'])
        }
    })

    const contentAnimationStyle = useAnimatedStyle(() => {
        if (!isModalVisible && animatedIndex.value == 0) return {}
        return {
            transform: [
                { scale: interpolate(animatedIndex.value, [-1, 0], [1, 0.88]) },
                { translateY: interpolate(animatedIndex.value, [-1, 0], [0, 20]) }
            ]
        }
    })

    useImperativeHandle(ref, () => ({
        open: (content: ReactNode) => {
            setBottomSheetContent(content)
            bottomSheetRef.current?.present()
        },
        close: () => bottomSheetRef.current?.close
    }))

    return (
        <Animated.View style={[styles.container, containerAnimationStyle]}>
            <Animated.View style={[styles.contentWrapper, contentAnimationStyle]}>{children}</Animated.View>

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={['90%']}
                enableDynamicSizing={false}
                stackBehavior='push'
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetBackground}
                handleStyle={styles.bottomSheetHandle}
                animatedIndex={animatedIndex}
                enablePanDownToClose={true}
            >
                {bottomSheetContent}
            </BottomSheetModal>
        </Animated.View>
    )
})

export default AnimatedBottomSheetLayout

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentWrapper: { flex: 1 },
    bottomSheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    bottomSheetHandle: { display: 'none' }
})

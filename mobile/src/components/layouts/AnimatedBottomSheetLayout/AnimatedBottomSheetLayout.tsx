import { useCallback, useRef, useState, useImperativeHandle, forwardRef, ReactNode } from 'react'
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, withTiming } from 'react-native-reanimated'
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
    const { bottom } = useSafeAreaInsets()
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
    const [pendingContent, setPendingContent] = useState<ReactNode>(null)
    const [content, setContent] = useState<ReactNode>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSheetChange = useCallback(
        (index: number) => {
            setBottomSheetVisible(index >= 0)

            if (index === 0) {
                if (pendingContent) {
                    setContent(pendingContent)
                    setPendingContent(null)
                    setIsLoading(false)
                }
            }

            if (index === -1) {
                setContent(null)
                setIsLoading(false)
            }
        },
        [pendingContent]
    )

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
        ),
        []
    )

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(animatedIndex.value, [-1, 0], ['#FFFFFF', 'rgba(0,0,0,0.4)'])
    }))

    const contentStyle = useAnimatedStyle(() => {
        const scale = withTiming(animatedIndex.value >= 0 ? 0.96 : 1, { duration: 250 })
        const translateY = withTiming(animatedIndex.value >= 0 ? 8 : 0, { duration: 250 })
        const opacity = withTiming(animatedIndex.value >= 0 ? 0.95 : 1, { duration: 250 })

        return {
            transform: [{ scale }, { translateY }],
            opacity
        }
    })

    useImperativeHandle(ref, () => ({
        open: (newContent: ReactNode) => {
            if (bottomSheetVisible) {
                setContent(newContent)
                setIsLoading(false)
            } else {
                setPendingContent(newContent)
                setIsLoading(true)
                bottomSheetRef.current?.present()
            }
        },
        close: () => {
            bottomSheetRef.current?.close()
        }
    }))

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={['96%']}
                enableDynamicSizing={false}
                stackBehavior='push'
                onChange={onSheetChange}
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.sheetBackground}
                handleStyle={styles.sheetHandle}
                animatedIndex={animatedIndex}
                enablePanDownToClose={false}
                enableContentPanningGesture={Platform.OS === 'ios' ? true : false}
            >
                <Animated.View style={[styles.sheetContent, { paddingBottom: bottom }]}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size='large' color='#000' />
                        </View>
                    ) : (
                        content
                    )}
                </Animated.View>
            </BottomSheetModal>
            <Animated.View style={[styles.contentWrapper, contentStyle]}>{children}</Animated.View>
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

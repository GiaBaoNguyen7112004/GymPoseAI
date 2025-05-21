import { useRef, forwardRef, ReactNode } from 'react'
import { Platform, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, withTiming } from 'react-native-reanimated'
import { AnimatedBottomSheetLayoutRef } from '@/types/components/bottomSheet.type'
import DynamicBottomSheet from '@/components/DynamicBottomSheet'

type Props = {
    children: ReactNode
}

const AnimatedBottomSheetLayout = forwardRef<AnimatedBottomSheetLayoutRef, Props>(({ children }, ref) => {
    const animatedIndex = useSharedValue(-1)

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(animatedIndex.value, [-1, 0], ['#FFFFFF', 'rgba(0,0,0,0.5)'])
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

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <DynamicBottomSheet
                ref={ref}
                snapPoints={['96%']}
                enableDynamicSizing={false}
                handleStyle={styles.sheetHandle}
                animatedIndex={animatedIndex}
                enablePanDownToClose={false}
                enableContentPanningGesture={Platform.OS === 'ios' ? true : false}
            />
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
    sheetHandle: {
        display: 'none'
    }
})

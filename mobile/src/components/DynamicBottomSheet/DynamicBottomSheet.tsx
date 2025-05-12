import React, { useCallback, useRef, useState, useImperativeHandle, forwardRef, ReactNode, memo } from 'react'
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native'
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetBackdropProps,
    BottomSheetModalProps,
    BottomSheetView
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatedBottomSheetLayoutRef } from '@/types/components/bottomSheet.type'
import { SharedValue } from 'react-native-reanimated'

interface Props extends Omit<BottomSheetModalProps, 'children'> {
    animatedIndex?: SharedValue<number>
}

const DynamicBottomSheet = forwardRef<AnimatedBottomSheetLayoutRef, Props>(
    ({ animatedIndex, enablePanDownToClose = true, enableDynamicSizing = true, ...rest }, ref) => {
        const bottomSheetRef = useRef<BottomSheetModal>(null)
        const { bottom } = useSafeAreaInsets()
        const [isLoading, setIsLoading] = useState(false)
        const [content, setContent] = useState<ReactNode>(null)

        const renderBackdrop = useCallback(
            (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    pressBehavior='close'
                    onPress={handleClose}
                />
            ),
            []
        )

        const handlePresent = useCallback((newContent: ReactNode) => {
            setIsLoading(true)
            setContent(newContent)
            bottomSheetRef.current?.present()
            setIsLoading(false)
        }, [])

        const handleClose = useCallback(() => {
            setContent(null)
            bottomSheetRef.current?.dismiss()
        }, [])

        const handleDismiss = useCallback(() => {
            setContent(null)
            setIsLoading(false)
        }, [])

        useImperativeHandle(ref, () => ({
            open: handlePresent,
            close: handleClose
        }))

        return (
            <BottomSheetModal
                ref={bottomSheetRef}
                enableDynamicSizing={enableDynamicSizing}
                stackBehavior='push'
                onDismiss={handleDismiss}
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.sheetBackground}
                enablePanDownToClose={enablePanDownToClose}
                animatedIndex={animatedIndex}
                enableContentPanningGesture={Platform.OS === 'ios'}
                {...rest}
            >
                <BottomSheetView style={[styles.sheetContent, { paddingBottom: bottom }]}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size='large' color='#000' />
                        </View>
                    ) : (
                        content
                    )}
                </BottomSheetView>
            </BottomSheetModal>
        )
    }
)

export default memo(DynamicBottomSheet)

const styles = StyleSheet.create({
    container: { flex: 1 },
    sheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
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

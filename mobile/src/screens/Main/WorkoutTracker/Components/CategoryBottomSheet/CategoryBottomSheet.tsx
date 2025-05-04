import { forwardRef, memo, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetView
} from '@gorhom/bottom-sheet'

import CategoryCard from '@/components/CategoryCard'
import CategoryCardSkeleton from '@/components/CategoryCardSkeleton'
import { Category } from '@/types/exercises.type'
import { useCategories } from '@/hooks/useCategoriesData'

interface CategoryBottomSheetProps {
    handleCategoryPress: (category: Category) => void
}

const CategoryBottomSheet = forwardRef<BottomSheet, CategoryBottomSheetProps>(({ handleCategoryPress }, ref) => {
    const { categoriesData, categoriesLoading } = useCategories()
    const renderCategoryItem = useCallback(
        ({ item }: { item: Category }) => <CategoryCard itemData={item} onPress={() => handleCategoryPress(item)} />,
        [handleCategoryPress]
    )
    const renderSkeletons = useCallback(() => [1, 2].map((_, index) => <CategoryCardSkeleton key={index} />), [])

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={-1}
                disappearsOnIndex={-1}
                pressBehavior='none'
                enableTouchThrough={true}
                style={{ height: 0 }}
            />
        ),
        []
    )

    return (
        <BottomSheet
            ref={ref}
            index={0}
            snapPoints={['55%', '90%']}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={false}
            enableDynamicSizing={false}
            enableContentPanningGesture={false}
        >
            <BottomSheetView style={styles.bottomSheetContent}>
                <View style={styles.trainingSection}>
                    <Text style={styles.trainingTitle}>What Do You Want to Train</Text>
                    {categoriesLoading ? (
                        renderSkeletons()
                    ) : (
                        <BottomSheetFlatList
                            data={categoriesData}
                            scrollEnabled
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'
                            bounces={false}
                        />
                    )}
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
})

const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1
    },
    trainingSection: {
        flex: 1,
        paddingHorizontal: 20
    },
    trainingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 19,
        color: '#1D1617'
    }
})

export default memo(CategoryBottomSheet)

import { forwardRef, memo, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet'

import CategoryCard from '@/components/CategoryCard'
import { Category } from '@/types/exercises.type'
import { useCategories } from '@/hooks/useCategoriesData'
import EmptyComponent from '@/components/EmptyComponent'
import CategorySkeletonList from '../CategorySkeletonList'
import InvisibleBackdrop from '@/components/InvisibleBackdrop'
import { defaultKeyExtractor } from '@/utils/list'

interface CategoryBottomSheetProps {
    handleCategoryPress: (category: Category) => void
    isReady?: boolean
}

const CategoryBottomSheet = forwardRef<BottomSheet, CategoryBottomSheetProps>(
    ({ handleCategoryPress, isReady }, ref) => {
        const { categoriesData, categoriesLoading } = useCategories()
        const renderCategoryItem = useCallback(
            ({ item }: { item: Category }) => (
                <CategoryCard itemData={item} onPress={() => handleCategoryPress(item)} />
            ),
            [handleCategoryPress]
        )

        const contentReady = isReady && !categoriesLoading
        return (
            <BottomSheet
                ref={ref}
                index={0}
                snapPoints={['55%', '90%']}
                backdropComponent={InvisibleBackdrop}
                enablePanDownToClose={false}
                enableDynamicSizing={false}
                enableContentPanningGesture={false}
            >
                <BottomSheetView style={styles.bottomSheetContent}>
                    <View style={styles.trainingSection}>
                        <Text style={styles.trainingTitle}>What Do You Want to Train</Text>
                        {contentReady ? (
                            <BottomSheetFlatList
                                data={categoriesData}
                                scrollEnabled
                                renderItem={renderCategoryItem}
                                keyExtractor={defaultKeyExtractor}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps='handled'
                                bounces={false}
                                ListEmptyComponent={EmptyComponent}
                            />
                        ) : (
                            <CategorySkeletonList />
                        )}
                    </View>
                </BottomSheetView>
            </BottomSheet>
        )
    }
)

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

import React, { memo } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { ViewModeType } from '@/types/utils.type'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'
import TabBar from '@/screens/Other/WorkoutHistoryCenter/Components/TabBar'
import FilterBar from '@/screens/Other/WorkoutHistoryCenter/Components/FilterBar'
import SortButton from '../SortButton'
import { Filter } from '../FilterBar/FilterBar'

interface Props {
    category_id: string
    viewMode: Filter
    order: 'asc' | 'desc'
    onCategoryChange: (value: string) => void
    onViewModeChange: (value: Filter) => void
    onOrderChange: () => void
}

const FilterControls = ({ category_id, viewMode, order, onCategoryChange, onViewModeChange, onOrderChange }: Props) => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                <TabBar activeTab={category_id} onChangeTab={onCategoryChange} />
            </ScrollView>

            <View style={styles.filters}>
                <SortButton order={order} onOrderChange={onOrderChange} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterBar activeFilterProp={viewMode} onChangeFilter={onViewModeChange} />
                </ScrollView>
            </View>
        </View>
    )
}

export default memo(FilterControls)

const styles = StyleSheet.create({
    tabsContainer: {
        height: 40,
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        marginBottom: 4
    },
    filters: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 16,
        gap: 12,
        backgroundColor: '#FFF',
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        borderRadius: 10
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    sortText: {
        color: '#4b5563'
    }
})

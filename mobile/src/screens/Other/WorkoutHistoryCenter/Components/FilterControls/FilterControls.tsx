import React, { memo } from 'react'
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { categories } from '@/types/workoutHistory.type'
import { ViewModeType } from '@/types/utils.type'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'
import TabBar from '@/screens/Other/WorkoutHistoryCenter/Components/TabBar'
import FilterBar from '@/screens/Other/WorkoutHistoryCenter/Components/FilterBar'
import SortButton from '../SortButton'

interface Props {
    category: categories
    viewMode: ViewModeType
    order: 'asc' | 'desc'
    onCategoryChange: (value: categories) => void
    onViewModeChange: (value: ViewModeType) => void
    onOrderChange: () => void
}

const FilterControls = ({ category, viewMode, order, onCategoryChange, onViewModeChange, onOrderChange }: Props) => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                <TabBar activeTab={category} onChangeTab={onCategoryChange} />
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

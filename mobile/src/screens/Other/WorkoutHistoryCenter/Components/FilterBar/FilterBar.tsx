import { ViewModeType } from '@/types/utils.type'
import { memo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FILTERS = ['daily', 'weekly', 'monthly', 'yearly'] as const
type Filter = (typeof FILTERS)[number]

interface FilterBarProps {
    onChangeFilter?: (value: ViewModeType) => void
    activeFilterProp?: Filter
}

function FilterBar({ activeFilterProp, onChangeFilter }: FilterBarProps) {
    const [activeFilter, setActiveFilter] = useState<Filter>(activeFilterProp || 'weekly')
    const handleChangeViewMode = (value: Filter) => {
        setActiveFilter(value)
        onChangeFilter?.(value)
    }
    return (
        <View style={styles.durationFilters}>
            {FILTERS.map((filter) => {
                const isActive = filter === activeFilter
                return (
                    <TouchableOpacity
                        key={filter}
                        style={[styles.filterButton, isActive && styles.activeFilterButton]}
                        onPress={() => handleChangeViewMode(filter)}
                    >
                        <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default memo(FilterBar)

const styles = StyleSheet.create({
    durationFilters: {
        flexDirection: 'row',
        gap: 8
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: 'white'
    },
    activeFilterButton: {
        borderColor: '#93A7FE'
    },
    filterButtonText: {
        fontSize: 12,
        color: '#4b5563',
        transform: 'capitalize'
    },
    activeFilterButtonText: {
        color: '#5A76FA'
    }
})

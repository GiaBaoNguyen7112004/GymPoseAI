import { memo, useCallback, useMemo, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import WorkoutChart from '@/components/WorkoutChart'
import CustomDropdown from '@/components/DropdownInput/Components/Dropdown'
import { ViewModeDropdown } from '@/constants/dropdown.constant'
import { workoutHistoryApi } from '@/services/rest'
import { ViewModeType } from '@/types/utils.type'
import useDebounce from '@/hooks/useDebounce'
import useUserData from '@/hooks/useUserData'

function WorkoutProgressChart() {
    const { userData } = useUserData()
    const [viewMode, setViewMode] = useState<ViewModeType>('weekly')
    const debouncedViewMode = useDebounce(viewMode, 1000)

    const { data } = useQuery({
        queryKey: ['workoutHistory', debouncedViewMode, userData?.id],
        queryFn: () =>
            workoutHistoryApi.getWorkoutHistoryByViewMode({
                id: userData?.id as string,
                viewMode: debouncedViewMode
            }),
        staleTime: 1000 * 60 * 5,
        enabled: !!userData?.id
    })

    const workoutHistoryData = data?.data.data || []

    const handleViewModeChange = useCallback((val: string) => {
        setViewMode(val as ViewModeType)
    }, [])

    const dropdownData = useMemo(() => ViewModeDropdown, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Workout Progress</Text>
                <CustomDropdown
                    data={dropdownData}
                    containerStyle={styles.dropdown}
                    value={viewMode}
                    textStyle={styles.dropdownText}
                    iconStyle={styles.dropdownIcon}
                    onChange={handleViewModeChange}
                />
            </View>

            <WorkoutChart viewMode={debouncedViewMode} workoutData={workoutHistoryData} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: '100%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    dropdown: {
        backgroundColor: '#9DCEFF',
        borderRadius: 20,
        height: 30,
        paddingHorizontal: 10,
        justifyContent: 'center',
        maxWidth: 85
    },
    dropdownText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 10
    },
    dropdownIcon: {
        tintColor: '#fff',
        alignSelf: 'flex-end'
    }
})

export default memo(WorkoutProgressChart)

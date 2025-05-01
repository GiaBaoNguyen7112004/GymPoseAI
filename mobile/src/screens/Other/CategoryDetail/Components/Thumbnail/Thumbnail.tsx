import { View, StyleSheet } from 'react-native'
import { memo, useMemo } from 'react'

import MyIcon from '@/components/Icon'
import { ICONS_CATEGORY_MAP } from '@/constants/common.constants'
import { Category } from '@/types/exercises.type'
import { categories } from '@/types/workoutHistory.type'

interface ThumbnailProps {
    category?: Category
}

function Thumbnail({ category }: ThumbnailProps) {
    const iconName = useMemo(() => {
        return ICONS_CATEGORY_MAP.get(category?.name as categories) || 'movement1'
    }, [category?.name])

    return (
        <View style={styles.container}>
            <MyIcon name={iconName} size={316} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        height: 288,
        width: 288,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 999,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

export default memo(Thumbnail)

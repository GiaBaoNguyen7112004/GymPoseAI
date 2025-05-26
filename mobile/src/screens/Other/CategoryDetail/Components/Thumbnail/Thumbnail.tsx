import { View, StyleSheet } from 'react-native'
import { memo } from 'react'

import MyIcon from '@/components/Icon'
import { Category } from '@/types/exercises.type'

interface ThumbnailProps {
    category?: Category
}

function Thumbnail({ category }: ThumbnailProps) {
    return <View style={styles.container}>{category && <MyIcon name='AbWorkout' size={316} />}</View>
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

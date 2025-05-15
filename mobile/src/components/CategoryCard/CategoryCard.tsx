import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/components/Icon'
import { Category } from '@/types/exercises.type'
import { categories } from '@/types/workoutHistory.type'
import { ICONS_CATEGORY_MAP } from '@/constants/common.constants'
import { memo, useMemo } from 'react'

interface CategoryCardProps {
    onPress?: () => void
    itemData: Category
}

const mapSizeImageToData: Record<categories, number> = {
    'abdominal muscles': 121,
    'lower body': 73,
    'full body': 110
}

function CategoryCard({ onPress, itemData }: CategoryCardProps) {
    const IconObj = useMemo(() => {
        const iconName = ICONS_CATEGORY_MAP.get(itemData.name as categories) || 'movement1'
        const size = mapSizeImageToData[itemData.name as categories] || 110
        return {
            iconName,
            size
        }
    }, [itemData.name])
    return (
        <View style={styles.exerciseCard}>
            <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{itemData.name}</Text>
                <Text style={styles.exerciseDetails}>
                    {itemData.exercise_count} Exercises | {itemData.duration_minutes} mins
                </Text>
                <TouchableOpacity style={styles.btnViewMore} onPress={onPress}>
                    <Text style={styles.viewMore}>View more</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.exerciseImageContainer}>
                <MyIcon name={IconObj.iconName} size={IconObj.size} />
            </View>
        </View>
    )
}

export default memo(CategoryCard)

const styles = StyleSheet.create({
    exerciseCard: {
        backgroundColor: '#f0f4ff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exerciseInfo: {
        flex: 1
    },
    exerciseName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1D1617',
        marginBottom: 5,
        textTransform: 'capitalize'
    },
    exerciseDetails: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72',
        marginBottom: 15
    },
    btnViewMore: {
        width: 94,
        height: 35,
        borderRadius: 999,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewMore: {
        color: '#7B9CFF',
        fontSize: 10,
        fontWeight: '500'
    },
    exerciseImageContainer: {
        width: 92,
        height: 92,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 999
    },
    exerciseImage: {
        width: 70,
        height: 70
    }
})

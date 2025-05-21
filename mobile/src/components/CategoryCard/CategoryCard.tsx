import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/components/Icon'
import { Category } from '@/types/exercises.type'
import { memo } from 'react'

interface CategoryCardProps {
    onPress?: () => void
    itemData: Category
}

function CategoryCard({ onPress, itemData }: CategoryCardProps) {
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
                {itemData.thumbnail_url ? (
                    <Image source={{ uri: itemData.thumbnail_url }} style={styles.exerciseImage} resizeMode='cover' />
                ) : (
                    <MyIcon name='movement1' size={110} />
                )}
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
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E4E4E7',
        shadowColor: '#7B6F72',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 1
    },
    exerciseImage: {
        width: '100%',
        height: '100%'
    }
})

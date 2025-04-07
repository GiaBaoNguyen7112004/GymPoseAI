import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import { Category } from '@/src/types/exercises.type'

interface CategoryCartProps {
    onPress?: () => void
    itemData: Category
}

function CategoryCart({ onPress, itemData }: CategoryCartProps) {
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
                <MyIcon name='AbWorkout' size={121} />
            </View>
        </View>
    )
}

export default CategoryCart

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
        marginBottom: 5
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

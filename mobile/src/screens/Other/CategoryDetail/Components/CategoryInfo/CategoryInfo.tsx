import useCategoryData from '@/hooks/useCategoryData'
import { Category } from '@/types/exercises.type'
import { Skeleton } from 'moti/skeleton'
import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface CategoryInfoProps {
    category?: Category
}

function CategoryInfo({ category }: CategoryInfoProps) {
    if (!category)
        return (
            <View style={styles.skeletonWrapper}>
                <Skeleton height={16} width={100} radius={5} colorMode='light' />
                <Skeleton height={12} width={200} radius={5} colorMode='light' />
            </View>
        )

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>{category?.name}</Text>
                <Text style={styles.desc}>
                    {category?.exercise_count} Exercises | {category?.duration_minutes} mins |{' '}
                    {category?.duration_minutes} Calories Burn
                </Text>
            </View>
            <Text style={[styles.title, styles.exerciseTitle]}>Exercises</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10
    },
    header: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    skeletonWrapper: {
        marginTop: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 6
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
        color: '#1D1617',
        textTransform: 'capitalize'
    },
    desc: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72',
        textTransform: 'capitalize'
    },
    exerciseTitle: {
        paddingHorizontal: 20
    }
})

export default memo(CategoryInfo)

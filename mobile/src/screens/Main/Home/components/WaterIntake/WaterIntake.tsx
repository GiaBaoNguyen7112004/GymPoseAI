import React, { memo, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Progress from '@/components/Progress'
import TextGradient from '@/components/TextGradient'
import WaterLogItem from './WaterLogItem'
import { defaultKeyExtractor } from '@/utils/list'
import { useWaterIntakeData, waterLogIntake } from '@/hooks/useWaterIntakeData'
import { ScrollView } from 'react-native-gesture-handler'

const WaterIntake: React.FC = () => {
    const { progress, transformedIntakes, target } = useWaterIntakeData()

    const renderItem = useCallback(
        ({ item, index }: { index: number; item: waterLogIntake }) => (
            <WaterLogItem item={item} isLast={index === transformedIntakes.length - 1} />
        ),
        [transformedIntakes.length]
    )

    return (
        <View style={styles.container}>
            <Progress.Bar progress={progress} />
            <View style={styles.content}>
                <Text style={styles.title}>Water Intake</Text>
                <TextGradient textStyle={styles.value} text={`${target} Liters`} />
                <Text style={styles.subtitle}>Real time updates</Text>
                <ScrollView style={styles.flatListContainer} horizontal scrollEnabled={false}>
                    <FlatList
                        data={transformedIntakes}
                        keyExtractor={defaultKeyExtractor}
                        renderItem={renderItem}
                        nestedScrollEnabled={true}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default memo(WaterIntake)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 8,
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 20
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    value: {
        marginTop: 5,
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 21
    },
    subtitle: {
        marginBottom: 5,
        fontSize: 10,
        color: '#7B6F72',
        fontWeight: '400',
        lineHeight: 15,
        marginTop: 10
    },
    flatListContainer: {
        maxHeight: 200
    }
})

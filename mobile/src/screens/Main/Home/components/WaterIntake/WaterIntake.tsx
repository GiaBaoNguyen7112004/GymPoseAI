import Progress from '@/components/Progress'
import TextGradient from '@/components/TextGradient'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MyIcon from '@/components/Icon'
import { defaultKeyExtractor } from '@/utils/list'

const DATA = [{ id: 1, value: 600, time: '6am - 8am' }]

function WaterIntake() {
    const renderWaterLogItem = ({ item }: { item: { id: number; value: number; time: string } }) => (
        <View style={styles.waterIntake__item}>
            <View style={styles.waterIntake__timeline}>
                <MyIcon name='dotGradient' size={8} />
                <MyIcon name='line28Icon' size={24} width={1} style={styles.timeline__line} />
            </View>
            <View>
                <Text style={styles.waterIntake__time}>{item.time}</Text>
                <TextGradient
                    textStyle={styles.waterIntake__value}
                    text={`${item.value} ml`}
                    colors={['#C58BF2', '#EEA4CE']}
                />
            </View>
        </View>
    )
    return (
        <View style={styles.stats_waterIntake}>
            <Progress.Bar progress={0.3} />
            <View>
                <Text style={styles.stats__title}>Water Intake</Text>
                <TextGradient textStyle={styles.stats__value} text='4 Liters' />
                <Text style={styles.waterIntake__subtitle}>Real time updates</Text>
                <ScrollView horizontal={true} style={{ width: '100%' }}>
                    <FlatList data={DATA} keyExtractor={defaultKeyExtractor} renderItem={renderWaterLogItem} />
                </ScrollView>
            </View>
        </View>
    )
}

export default WaterIntake

const styles = StyleSheet.create({
    stats__title: {
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    stats__value: {
        marginTop: 5,
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 21
    },
    stats_waterIntake: {
        width: '100%',
        height: 315,
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
    waterIntake__subtitle: {
        marginBottom: 5,
        fontSize: 10,
        color: '#7B6F72',
        fontWeight: '400',
        lineHeight: 15,
        marginTop: 10
    },
    waterIntake__item: {
        width: 92,
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'flex-start'
    },
    waterIntake__timeline: {
        alignItems: 'center'
    },
    timeline__line: {
        marginVertical: 5
    },
    waterIntake__time: {
        fontSize: 8,
        color: '#ADA4A5',
        fontWeight: '400',
        lineHeight: 12,
        marginTop: -2
    },
    waterIntake__value: {
        fontSize: 8,
        color: '#ADA4A5',
        fontWeight: '500',
        lineHeight: 12,
        marginTop: 3
    }
})

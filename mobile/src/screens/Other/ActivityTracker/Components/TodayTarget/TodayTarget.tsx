import GradientButton from '@/src/components/GradientButton'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import TextGradient from '@/src/components/TextGradient'

interface TodayTargetProps {
    updateTodayTargetPress: () => void
    caloriesVal: number
    waterVal: number
}

function TodayTarget({ waterVal, caloriesVal, updateTodayTargetPress }: TodayTargetProps) {
    return (
        <View style={styles.todayTargetCard}>
            <View style={styles.todayTargetHeader}>
                <Text style={styles.todayTargetTitle}>Today Target</Text>
                <GradientButton style={styles.todayTargetBadge} onPress={updateTodayTargetPress}>
                    <AntDesign name='plus' size={18} color='#FFF' style={styles.todayTargetIconPlus} />
                </GradientButton>
            </View>

            <View style={styles.targetsContainer}>
                <View style={styles.targetItem}>
                    <MyIcon name='glassOfWater' width={25} height={34} />
                    <View>
                        <TextGradient text={`${waterVal}L`} textStyle={styles.targetValue} />
                        <Text style={styles.targetLabel}>Water Intake</Text>
                    </View>
                </View>

                <View style={styles.targetItem}>
                    <MyIcon name='boots' width={26} height={26} />
                    <View>
                        <TextGradient text={`${caloriesVal}Cal`} textStyle={styles.targetValue} />
                        <Text style={styles.targetLabel}>Calories Burn</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TodayTarget

const styles = StyleSheet.create({
    todayTargetCard: {
        backgroundColor: '#EAF0FF',
        borderRadius: 22,
        padding: 20,
        width: '100%'
    },
    todayTargetHeader: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    todayTargetTitle: {
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '600'
    },
    todayTargetBadge: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    todayTargetIconPlus: {
        position: 'absolute'
    },
    targetsContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'flex-start'
    },
    targetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFF',
        padding: 9,
        borderRadius: 12,
        flex: 1,
        minHeight: 60
    },
    waterIconContainer: {
        width: 25,
        height: 34
    },
    stepsIconContainer: {
        backgroundColor: '#FEF3C7',
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    targetValue: {
        fontSize: 14,
        fontWeight: '600'
    },
    targetValueHighlight: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937'
    },
    targetLabel: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72'
    }
})

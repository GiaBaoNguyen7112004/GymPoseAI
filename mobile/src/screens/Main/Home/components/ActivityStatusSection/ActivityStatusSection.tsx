import { StyleSheet, Text, View } from 'react-native'
import WaterIntake from '../WaterIntake'
import CaloriesStats from '../CaloriesStats'
import useUserData from '@/hooks/useUserData'
import MyIcon from '@/components/Icon'
import { memo } from 'react'

function ActivityStatusSection() {
    const { userData } = useUserData()

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Activity Status</Text>
                <View style={styles.statsRow}>
                    <View style={styles.leftColumn}>
                        <WaterIntake />
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.squareBox}>
                            <MyIcon name='sleepGraph' width='100%' size={110} />
                        </View>
                        <View style={styles.squareBox}>
                            <CaloriesStats user_id={userData?.id || ''} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default memo(ActivityStatusSection)

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
        width: '90%'
    },
    container: {
        width: '100%'
    },
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    statsRow: {
        marginTop: 16,
        flexDirection: 'row',
        columnGap: 15
    },
    leftColumn: {
        flex: 1
    },
    rightColumn: {
        flex: 1,
        rowGap: 15
    },
    squareBox: {
        flex: 1,
        width: '100%',
        maxHeight: 150,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 8
    }
})

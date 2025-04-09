import { COLOR_BRANDS } from '@/src/constants/common.constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import { useContext } from 'react'
import { AppContext } from '@/src/Contexts/App.context'

function BMIStats() {
    const { profile } = useContext(AppContext)
    const bmi = ((profile?.weight ?? 0) / ((profile?.height ?? 1) / 100) ** 2).toFixed(2)
    return (
        <View>
            <View style={styles.bmiShadow}>
                <LinearGradient
                    colors={COLOR_BRANDS.primary}
                    start={{ x: 0.4, y: 0 }}
                    end={{ x: 0.2, y: 1 }}
                    style={styles.bmiInner}
                >
                    <View style={styles.bmiContent}>
                        <Text style={styles.bmiHeading}>BMI (Body Mass Index)</Text>
                        <Text style={styles.bmiDescription}>You have a normal weight</Text>
                    </View>

                    <View style={styles.bmiChartContainer}>
                        <MyIcon name='pieChart' size={176} style={styles.bmiChart} />
                        <Text style={styles.bmiResult}>{bmi}</Text>
                    </View>

                    <View style={[styles.ellipse50, styles.ellipseBottomLeft]} />
                    <View style={[styles.ellipse50, styles.ellipseBottomRight]} />
                    <View style={[styles.ellipse8, styles.ellipseSmall1]} />
                    <View style={[styles.ellipse8, styles.ellipseSmall2]} />
                    <View style={[styles.ellipse8, styles.ellipseSmall3]} />
                    <View style={[styles.ellipse8, styles.ellipseSmall4]} />
                </LinearGradient>
            </View>
        </View>
    )
}

export default BMIStats

const styles = StyleSheet.create({
    bmiShadow: {
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 5
    },
    bmiInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 22,
        paddingTop: 26,
        paddingLeft: 20,
        paddingRight: 28,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bmiContent: {
        flex: 1
    },
    bmiHeading: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 21,
        width: 162
    },
    bmiDescription: {
        maxWidth: 157,
        marginTop: 5,
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    bmiChartContainer: {
        position: 'relative',
        flex: 1
    },
    bmiChart: {
        position: 'absolute',
        top: -30,
        right: -30
    },
    bmiResult: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
        position: 'absolute',
        top: 15,
        right: 25
    },
    ellipse50: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 999,
        backgroundColor: '#fff',
        opacity: 0.2
    },
    ellipse8: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: '#fff',
        opacity: 0.2
    },
    ellipseBottomLeft: {
        bottom: -18,
        left: -18
    },
    ellipseBottomRight: {
        bottom: -8,
        right: -8
    },
    ellipseSmall1: {
        bottom: 11,
        left: '60%'
    },
    ellipseSmall2: {
        bottom: 32,
        left: '40%'
    },
    ellipseSmall3: {
        top: 12,
        left: '35%'
    },
    ellipseSmall4: {
        top: 22,
        right: '60%'
    }
})

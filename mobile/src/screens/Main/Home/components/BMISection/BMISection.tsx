import { COLOR_BRANDS } from '@/constants/common.constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '@/components/Icon'
import { memo, useContext, useMemo } from 'react'
import { AppContext } from '@/Contexts/App.context'

const ELLIPSE_KEYS: Array<keyof typeof styles> = [
    'ellipseBottomLeft',
    'ellipseBottomRight',
    'ellipseSmall1',
    'ellipseSmall2',
    'ellipseSmall3',
    'ellipseSmall4'
]

const GRADIENT_START = { x: 0.4, y: 0 }
const GRADIENT_END = { x: 0.2, y: 1 }

const EllipsesDecoration = memo(() => (
    <>
        {ELLIPSE_KEYS.map((key, idx) => (
            <View key={idx} style={[styles.ellipseBase, styles[key]]} />
        ))}
    </>
))

function BMISection() {
    const { profile } = useContext(AppContext)

    const bmi = useMemo(() => {
        const weight = profile?.weight ?? 0
        const height = profile?.height ?? 1
        return (weight / (height / 100) ** 2).toFixed(2)
    }, [profile])

    return (
        <View style={styles.wrapper}>
            <View style={styles.shadow}>
                <LinearGradient
                    colors={COLOR_BRANDS.primary}
                    start={GRADIENT_START}
                    end={GRADIENT_END}
                    style={styles.container}
                >
                    <View style={styles.content}>
                        <Text style={styles.heading}>BMI (Body Mass Index)</Text>
                        <Text style={styles.description}>You have a normal weight</Text>
                    </View>

                    <View style={styles.chartContainer}>
                        <MyIcon name='pieChart' size={176} style={styles.chartIcon} />
                        <Text style={styles.bmiValue}>{bmi}</Text>
                    </View>

                    <EllipsesDecoration />
                </LinearGradient>
            </View>
        </View>
    )
}

export default memo(BMISection)

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        marginTop: 30,
        height: 146
    },
    shadow: {
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 5
    },
    container: {
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
    content: {
        flex: 1
    },
    heading: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 21,
        width: 162
    },
    description: {
        marginTop: 5,
        maxWidth: 157,
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    chartContainer: {
        position: 'relative',
        flex: 1
    },
    chartIcon: {
        position: 'absolute',
        top: -30,
        right: -30
    },
    bmiValue: {
        position: 'absolute',
        top: 15,
        right: 25,
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18
    },
    ellipseBase: {
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: 0.2
    },
    ellipseBottomLeft: {
        width: 50,
        height: 50,
        borderRadius: 999,
        bottom: -18,
        left: -18
    },
    ellipseBottomRight: {
        width: 50,
        height: 50,
        borderRadius: 999,
        bottom: -8,
        right: -8
    },
    ellipseSmall1: {
        width: 8,
        height: 8,
        borderRadius: 999,
        bottom: 11,
        left: '60%'
    },
    ellipseSmall2: {
        width: 8,
        height: 8,
        borderRadius: 999,
        bottom: 32,
        left: '40%'
    },
    ellipseSmall3: {
        width: 8,
        height: 8,
        borderRadius: 999,
        top: 12,
        left: '35%'
    },
    ellipseSmall4: {
        width: 8,
        height: 8,
        borderRadius: 999,
        top: 22,
        right: '60%'
    }
})

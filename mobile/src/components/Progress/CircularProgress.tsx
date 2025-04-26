import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Circle, Defs, LinearGradient as Linear, Stop } from 'react-native-svg'

interface CircularProgressParams {
    progress: number
    size?: number
    children?: ReactNode
}

const CircularProgress = ({ progress, size = 66, children }: CircularProgressParams) => {
    const strokeWidth = 6
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - progress)
    const center = size / 2
    const containerSize = size + strokeWidth

    return (
        <View style={[styles.container, { width: containerSize, height: containerSize }]}>
            <View style={[styles.svgWrapper, { width: size, height: size }]}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Defs>
                        <Linear id='progressGradient' x1={center} y1={0} x2={center} y2={size}>
                            <Stop offset='0' stopColor='#C58BF2' />
                            <Stop offset='1' stopColor='#B4C0FE' />
                        </Linear>
                    </Defs>
                    <Circle cx={center} cy={center} r={radius} stroke='#F7F8F8' strokeWidth={strokeWidth} fill='none' />
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke='url(#progressGradient)'
                        strokeWidth={strokeWidth}
                        fill='none'
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap='round'
                    />
                </Svg>
            </View>

            <View style={[StyleSheet.absoluteFillObject, styles.childrenWrapper]} pointerEvents='none'>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    svgWrapper: {
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    childrenWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CircularProgress

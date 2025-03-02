import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Defs, LinearGradient as Linear, Stop, Mask, Path } from 'react-native-svg'

interface CircularProgressParams {
    progress: number
    size?: number
}

const CircularProgress = ({ progress, size = 66 }: CircularProgressParams) => {
    const strokeWidth = 6
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - progress)

    return (
        <View>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Mask tạo khoảng trống bên trong */}
                <Mask id='circle-mask'>
                    <Path
                        d={`M${size} ${size / 2}C${size} ${size * 0.7746} ${size * 0.7746} ${size} ${size / 2} ${size}C${size * 0.2254} ${size} 0 ${size * 0.7746} 0 ${size / 2}C0 ${size * 0.2254} ${size * 0.2254} 0 ${size / 2} 0C${size * 0.7746} 0 ${size} ${size * 0.2254} ${size} ${size / 2}ZM${size * 0.1} ${size / 2}C${size * 0.1} ${size * 0.727} ${size * 0.273} ${size * 0.9} ${size / 2} ${size * 0.9}C${size * 0.727} ${size * 0.9} ${size * 0.9} ${size * 0.727} ${size * 0.9} ${size / 2}C${size * 0.9} ${size * 0.273} ${size * 0.727} ${size * 0.1} ${size / 2} ${size * 0.1}C${size * 0.273} ${size * 0.1} ${size * 0.1} ${size * 0.273} ${size * 0.1} ${size / 2}Z`}
                        fill='white'
                    />
                </Mask>

                {/* Track nền */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke='#F7F8F8'
                    strokeWidth={strokeWidth}
                    fill='none'
                    mask='url(#circle-mask)'
                />

                {/* Progress bar */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke='url(#progressGradient)'
                    strokeWidth={strokeWidth}
                    fill='none'
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap='round'
                />

                {/* Gradient màu cho progress */}
                <Defs>
                    <Linear
                        id='progressGradient'
                        x1={size / 2}
                        y1={(-size / 2) * 1.0571}
                        x2={size / 2}
                        y2={(size / 2) * 1.3571}
                    >
                        <Stop offset='0' stopColor='#C58BF2' />
                        <Stop offset='1' stopColor='#B4C0FE' />
                    </Linear>
                </Defs>
            </Svg>
        </View>
    )
}

export default CircularProgress

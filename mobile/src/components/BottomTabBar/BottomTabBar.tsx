import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

let tabBarLayout = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

export function getTabBarHeight() {
    return tabBarLayout.height
}
interface TabBarComponentProps extends BottomTabBarProps {
    containerStyle?: StyleProp<ViewStyle>
}

export default function TabBarComponent({ containerStyle, ...bottomBarProps }: TabBarComponentProps) {
    return (
        <TouchableWithoutFeedback
            onLayout={(event) => {
                tabBarLayout = event.nativeEvent.layout
            }}
        >
            <BottomTabBar {...bottomBarProps} style={containerStyle} />
        </TouchableWithoutFeedback>
    )
}

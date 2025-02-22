import React from 'react'
import { Text, View, TextProps } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export interface TextGradient extends TextProps {
    text: string
    icon?: {
        name: string
        size: number
    }
}
const TextGradient = (props: TextGradient) => {
    return (
        <MaskedView
            maskElement={
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    {props.icon && <Icon name={props.icon.name} size={props.icon.size} />}
                    <Text {...props}>{props.text}</Text>
                </View>
            }
        >
            <LinearGradient colors={['#92A3FD', '#9DCEFF']} start={{ x: 0.2, y: 0 }} end={{ x: 1, y: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    {props.icon && <Icon name={props.icon.name} size={props.icon.size} color='rgba(0,0,0,0)' />}
                    <Text
                        {...props}
                        style={[
                            props.style,
                            {
                                opacity: 0
                            }
                        ]}
                    >
                        {props.text}
                    </Text>
                </View>
            </LinearGradient>
        </MaskedView>
    )
}

export default TextGradient

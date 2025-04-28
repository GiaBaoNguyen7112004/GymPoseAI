import React, { memo, forwardRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TextInputCustom from '../TextInput'
import { ControllerInputProps } from '../TextInput/components/ControlledInput'

interface TextInputWithUnitProps extends ControllerInputProps {
    unit: string
}

const TextInputWithUnit = forwardRef<TextInput, TextInputWithUnitProps>(
    ({ name, icon, type, unit, ...rest }: TextInputWithUnitProps, ref) => {
        return (
            <View style={styles.container}>
                <TextInputCustom
                    ref={ref}
                    name={name}
                    icon={icon}
                    type={type}
                    {...rest}
                    containerStyle={styles.input}
                />
                <LinearGradient
                    colors={['#C58BF2', '#EEA4CE']}
                    start={{ x: 0.8, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.unitBox}
                >
                    <Text style={styles.unitText}>{unit}</Text>
                </LinearGradient>
            </View>
        )
    }
)

export default memo(TextInputWithUnit)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    unitBox: {
        marginLeft: 15,
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unitText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500'
    },
    input: {
        flex: 1
    }
})

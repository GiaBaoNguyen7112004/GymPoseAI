import React, { useState, useEffect, memo, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Feather } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import NavigationBar from '@/components/NavigationBar'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import CustomGradientSwitch from '@/components/Switch'
import MenuItem from './components/MenuItem'
import { RootStackScreenProps } from '@/navigation/types'

function MyDevice({ navigation }: RootStackScreenProps<'MyDevice'>) {
    const { peripheralInfo } = useBluetoothContext()
    const [isConnected, setIsConnected] = useState(false)
    const [isSpeakerOn, setIsSpeakerOn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsConnected(true)
            setIsLoading(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    const handleUnpair = () => {
        setIsConnected(false)
        setIsLoading(true)
    }
    const handleBackPress = useCallback(() => {
        navigation.goBack()
    }, [])

    const handleLearnMore = useCallback(() => {
        navigation.navigate('AboutGymBot')
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <NavigationBar title={peripheralInfo?.name || 'Unknown'} callback={handleBackPress} />
            </View>

            <LottieView
                source={require('@/assets/animations/MyDevice_Camera.json')}
                autoPlay
                style={styles.banner}
                loop={false}
            />

            <View style={styles.menu}>
                <MenuItem
                    icon={
                        isLoading ? (
                            <ActivityIndicator size='small' color='#FFF' />
                        ) : (
                            <Feather name='check' size={18} color='#FFF' />
                        )
                    }
                    iconBg='#1D1617'
                    title={isLoading ? 'Connecting...' : 'Connected'}
                    disabled={isLoading}
                />

                <MenuItem
                    icon={<Icon name='settings-remote' size={18} color='#FFF' />}
                    iconBg='#5AC8FA'
                    title='Bluetooth Address'
                    subText='12:34:56:78:9A:BC'
                    disabled={isLoading}
                />

                <MenuItem
                    icon={<Icon name='volume-up' size={18} color='#FFF' />}
                    iconBg='#FFCC00'
                    title='Speaker'
                    rightContent={
                        <CustomGradientSwitch onValueChange={setIsSpeakerOn} value={isSpeakerOn} thumbColor='#FFF' />
                    }
                    disabled={isLoading}
                />

                <View style={styles.menu}>
                    <MenuItem
                        onPress={handleLearnMore}
                        title='Learn more about GymBot '
                        disabled={isLoading}
                        rightContent={<Feather name='chevron-right' size={24} color='#DDDADA' />}
                    />

                    <MenuItem title='Firmware Version' subText='V1.0.0' disabled={isLoading} />
                </View>
                <TouchableOpacity
                    style={[styles.unpairButton, isLoading && styles.disabled]}
                    onPress={handleUnpair}
                    disabled={isLoading}
                    accessibilityLabel='Unpair device'
                    accessibilityRole='button'
                >
                    <Text style={styles.unpairButtonText}>Unpair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(MyDevice)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    banner: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    menu: {
        paddingVertical: 10,
        marginTop: 10
    },
    unpairButton: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderRadius: 999,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 50,
        shadowColor: '#DDDADA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    },
    unpairButtonText: {
        color: '#92A3FD',
        fontSize: 16,
        fontWeight: '500'
    },
    disabled: {
        opacity: 0.5
    }
})

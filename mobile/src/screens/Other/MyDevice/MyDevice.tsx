import React, { memo, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Feather } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import NavigationBar from '@/components/NavigationBar'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import CustomGradientSwitch from '@/components/Switch'
import MenuItem from './components/MenuItem'
import { RootStackScreenProps } from '@/navigation/types'
import useAutoReconnectBLE from '@/hooks/useAutoReconnectBLE'
import showToast from '@/utils/toast.util'

function MyDevice({ navigation }: RootStackScreenProps<'MyDevice'>) {
    //auto reconnect ble with device
    useAutoReconnectBLE()

    const { peripheralInfo, isDisconnecting, configMyDevice, connectedDevice, disconnectFromDevice } =
        useBluetoothContext()

    const isMute = Boolean(peripheralInfo?.config.mute)
    const isConnecting = connectedDevice == null

    const handleBackPress = useCallback(() => {
        navigation.goBack()
    }, [])

    const handleLearnMore = useCallback(() => {
        navigation.navigate('AboutGymBot')
    }, [])

    const setSpeaker = useCallback((value: boolean) => {
        const newConfig = {
            mute: value
        }

        configMyDevice(newConfig)
    }, [])

    const handleDisconnect = useCallback(async () => {
        try {
            await disconnectFromDevice()
            navigation.goBack()
            showToast({
                title: 'Unpaired',
                subtitle: 'You have successfully unpair from the device.'
            })
        } catch (error) {
            console.error('Error disconnecting from device:', error)
        }
    }, [disconnectFromDevice])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <NavigationBar title={peripheralInfo?.name || 'GymBot'} callback={handleBackPress} />
            </View>

            {isConnecting ? (
                <Icon name='close' size={100} color='#D3D3D3' style={styles.loadingIcon} />
            ) : (
                <LottieView
                    source={require('@/assets/animations/MyDevice_Camera.json')}
                    autoPlay
                    style={styles.banner}
                    loop={false}
                />
            )}

            <View style={styles.menu}>
                <MenuItem
                    icon={
                        isConnecting ? (
                            <ActivityIndicator size='small' color='#FFF' />
                        ) : (
                            <Feather name='check' size={18} color='#FFF' />
                        )
                    }
                    iconBg='#1D1617'
                    title={isConnecting ? 'Connecting...' : 'Connected'}
                />

                <MenuItem
                    icon={<Icon name='settings-remote' size={18} color='#FFF' />}
                    iconBg='#5AC8FA'
                    title='Bluetooth Address'
                    subText={peripheralInfo?.id}
                    disabled={isConnecting}
                />

                <MenuItem
                    icon={<Icon name='volume-up' size={18} color='#FFF' />}
                    iconBg='#FFCC00'
                    title='Speaker'
                    rightContent={
                        <CustomGradientSwitch
                            onValueChange={setSpeaker}
                            value={isMute ? false : true}
                            thumbColor='#FFF'
                        />
                    }
                    disabled={isConnecting}
                />

                <View style={styles.menu}>
                    <MenuItem
                        onPress={handleLearnMore}
                        title='Learn more about GymBot '
                        disabled={isConnecting}
                        rightContent={<Feather name='chevron-right' size={24} color='#DDDADA' />}
                    />

                    <MenuItem title='Firmware Version' subText='V1.0.0' disabled={isConnecting} />
                </View>
                <TouchableOpacity
                    style={[styles.unpairButton, isDisconnecting && styles.disabled]}
                    onPress={handleDisconnect}
                    disabled={isDisconnecting}
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
        paddingVertical: 15
    },
    banner: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    loadingIcon: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        textAlign: 'center',
        lineHeight: 200
    },
    menu: {
        paddingVertical: 10,
        marginTop: 0
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

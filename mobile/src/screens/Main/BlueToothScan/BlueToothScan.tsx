import DeviceModal from '@/components/DeviceConnectionModal'
import GradientButton from '@/components/GradientButton'
import useBLE from '@/hooks/useBTE'
import { MainTabScreenProps } from '@/navigation/types'
import LottieView from 'lottie-react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const BlueToothScan = ({ navigation }: MainTabScreenProps<'BlueToothScan'>) => {
    const {
        allDevices,
        connectedDevice,
        connectToDevice,
        requestPermissions,
        scanForPeripherals,
        isScanning,
        responseMessage,
        disconnectFromDevice
    } = useBLE()

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false)

    const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions()
        if (isPermissionsEnabled) {
            scanForPeripherals()
        }
    }

    const hideModal = () => setIsModalVisible(false)

    const openModal = async () => {
        await scanForDevices()
        setIsModalVisible(true)
    }

    const gotoGymLive = () => {
        navigation.navigate('GymLiveScreen', {})
    }
    const hasIpDevice = responseMessage
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null

        if (connectedDevice) {
            setShowStatusMessage(false)
            timeout = setTimeout(() => {
                setShowStatusMessage(true)
            }, 2000)
        } else {
            setShowStatusMessage(false)
        }

        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [connectedDevice, hasIpDevice])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <LottieView
                    source={require('@/assets/animations/loading_connection.json')}
                    autoPlay
                    loop
                    style={styles.banner}
                />

                <Text style={styles.title}>{connectedDevice ? 'Camera Connected' : 'No Device Connected'}</Text>

                {!connectedDevice && (
                    <Text style={styles.subtitle}>Connect your camera to start tracking your workout progress.</Text>
                )}

                {connectedDevice && showStatusMessage && hasIpDevice && (
                    <View style={styles.overlayContainer}>
                        <Text style={styles.successText}>🎉 Connection Successful!</Text>
                    </View>
                )}

                {connectedDevice && showStatusMessage && !hasIpDevice && (
                    <View style={styles.warningBox}>
                        <Text style={styles.warningText}>
                            ⚠️ Connected but no IP found. Please reconnect your device.
                        </Text>
                    </View>
                )}
            </View>

            <GradientButton onPress={gotoGymLive} Square containerStyle={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>{connectedDevice ? 'Disconnect' : 'Connect Device'}</Text>
            </GradientButton>

            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
                onRefresh={scanForDevices}
                isScanning={isScanning}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#E6F0FA',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#1E90FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8
    },
    banner: {
        width: 260,
        height: 260,
        marginBottom: 32
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E293B',
        textAlign: 'center',
        marginTop: 12
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 24,
        maxWidth: '85%',
        fontFamily: 'Inter-Regular'
    },
    ctaButton: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 50
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold'
    },
    overlayContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    successText: {
        fontSize: 16,
        color: '#16a34a',
        fontWeight: '600',
        marginTop: 8
    },
    warningBox: {
        marginTop: 20,
        backgroundColor: '#fee2e2',
        padding: 12,
        borderRadius: 8
    },
    warningText: {
        color: '#b91c1c',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    }
})

export default BlueToothScan

import { defaultKeyExtractor } from '@/utils/list'
import React, { FC, useCallback, memo } from 'react'
import {
    FlatList,
    Modal,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native'
import { Device } from 'react-native-ble-plx'
import Icon from 'react-native-vector-icons/MaterialIcons'

type DeviceModalProps = {
    devices: Device[]
    visible: boolean
    connectToPeripheral: (device: Device) => void
    closeModal: () => void
    onRefresh: () => void
    isScanning: boolean
    connectedDeviceId?: string
}

const DeviceListItem: FC<{
    device: Device
    onSelect: (device: Device) => void
    connectedDeviceId?: string
}> = memo(({ device, onSelect, connectedDeviceId }) => {
    const handlePress = useCallback(() => onSelect(device), [device, onSelect])
    const name = device.name ?? device.localName ?? 'Unknown Device'
    const macAddress = device.id
    const isConnected = connectedDeviceId === device.id ? 'Connected' : 'Not Connected'

    return (
        <TouchableOpacity onPress={handlePress} style={styles.deviceListItem} activeOpacity={0.6}>
            <View style={{ flex: 1 }}>
                <Text style={styles.deviceListItemText}>{name}</Text>
                <Text style={styles.deviceMetaText}>MAC: {macAddress}</Text>
                <Text style={styles.deviceMetaText}>Status: {isConnected}</Text>
            </View>
            <Icon name='chevron-right' size={20} color='#555' />
        </TouchableOpacity>
    )
})

const DeviceModal: FC<DeviceModalProps> = ({
    devices,
    visible,
    connectToPeripheral,
    closeModal,
    onRefresh,
    isScanning,
    connectedDeviceId
}) => {
    const handleSelect = useCallback(
        (device: Device) => {
            connectToPeripheral(device)
            closeModal()
        },
        [connectToPeripheral, closeModal]
    )

    const renderItem = useCallback(
        ({ item }: { item: Device }) => (
            <DeviceListItem device={item} onSelect={handleSelect} connectedDeviceId={connectedDeviceId} />
        ),
        [handleSelect, connectedDeviceId]
    )

    return (
        <Modal animationType='slide' transparent visible={visible} onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
                <SafeAreaView style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitleText}>Select a Device</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={onRefresh} style={{ padding: 5, marginRight: 10 }}>
                                {isScanning ? (
                                    <ActivityIndicator size='small' color='#555' />
                                ) : (
                                    <Icon name='refresh' size={22} color='#555' />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Icon name='close' size={24} color='#555' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {devices.length > 0 ? (
                        <FlatList
                            data={devices}
                            renderItem={renderItem}
                            keyExtractor={defaultKeyExtractor}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            contentContainerStyle={styles.deviceList}
                            initialNumToRender={10}
                        />
                    ) : (
                        <View style={styles.emptyStateContainer}>
                            <Icon name='bluetooth-searching' size={60} color='#ccc' />
                            <Text style={styles.emptyStateText}>
                                {isScanning ? 'Scanning for devices...' : 'No devices found'}
                            </Text>
                            <Text style={styles.emptyStateSubtitle}>Make sure your device is on and nearby.</Text>
                        </View>
                    )}
                </SafeAreaView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    modalTitleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333'
    },
    closeButton: {
        padding: 5
    },
    deviceList: {
        paddingVertical: 10
    },
    deviceListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    deviceListItemText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#333',
        flex: 1,
        marginRight: 10
    },
    deviceMetaText: {
        fontSize: 13,
        color: '#666',
        marginTop: 2
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 15
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    emptyStateText: {
        fontSize: 18,
        color: '#888',
        marginTop: 15,
        textAlign: 'center'
    },
    emptyStateSubtitle: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 5,
        textAlign: 'center'
    }
})

export default memo(DeviceModal)

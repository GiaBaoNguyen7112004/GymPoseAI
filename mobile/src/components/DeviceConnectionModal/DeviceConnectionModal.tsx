import { FC, useCallback } from 'react'
import { FlatList, ListRenderItemInfo, Modal, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Device } from 'react-native-ble-plx'

type DeviceModalProps = {
    devices: Device[]
    visible: boolean
    connectToPeripheral: (device: Device) => void
    closeModal: () => void
}

type DeviceModalListItemProps = {
    item: ListRenderItemInfo<Device>
    connectToPeripheral: (device: Device) => void
    closeModal: () => void
}

const DeviceModalListItem: FC<DeviceModalListItemProps> = ({ item, connectToPeripheral, closeModal }) => {
    const handlePress = useCallback(() => {
        connectToPeripheral(item.item)
        closeModal()
    }, [item.item, connectToPeripheral, closeModal])

    return (
        <TouchableOpacity onPress={handlePress} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>{item.item.name ?? item.item.localName}</Text>
        </TouchableOpacity>
    )
}

const DeviceModal: FC<DeviceModalProps> = ({ devices, visible, connectToPeripheral, closeModal }) => {
    const renderItem = useCallback(
        (item: ListRenderItemInfo<Device>) => (
            <DeviceModalListItem item={item} connectToPeripheral={connectToPeripheral} closeModal={closeModal} />
        ),
        [connectToPeripheral, closeModal]
    )

    return (
        <Modal animationType='slide' transparent={false} visible={visible}>
            <SafeAreaView style={styles.modalContainer}>
                <Text style={styles.modalTitleText}>Tap on a device to connect</Text>
                <FlatList
                    contentContainerStyle={styles.deviceList}
                    data={devices}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    modalTitleText: {
        marginTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20,
        textAlign: 'center'
    },
    deviceList: {
        flex: 1,
        justifyContent: 'center'
    },
    ctaButton: {
        backgroundColor: '#FF6060',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default DeviceModal

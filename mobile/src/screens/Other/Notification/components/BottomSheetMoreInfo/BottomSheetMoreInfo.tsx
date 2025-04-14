import React, { forwardRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import { Notification } from '@/src/types/notification.type'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

interface BottomSheetMoreInfoProps {
    onDeleteNotification: () => void
    notificationData?: Notification
}

const BottomSheetMoreInfo = forwardRef<BottomSheetMethods, BottomSheetMoreInfoProps>(
    ({ onDeleteNotification, notificationData }, ref) => {
        if (notificationData == undefined) return null
        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={['25%', '50%']}
                enablePanDownToClose={true}
                backdropComponent={BottomSheetBackdrop}
            >
                <BottomSheetView style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheet__avatar}>
                        <MyIcon name='AbWorkout' size={60} />
                    </View>
                    <View style={styles.bottomSheet__content}>
                        <Text style={styles.bottomSheet__title}>
                            {notificationData.title || 'Notification Options'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.bottomSheet__btn} onPress={onDeleteNotification}>
                        <View style={styles.bottomSheet_IconWrapper}>
                            <MyIcon name='closeSquareBold' size={20} />
                        </View>
                        <Text style={styles.bottomSheet__btnText}>Delete this notification</Text>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        )
    }
)

export default BottomSheetMoreInfo
const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    bottomSheet__avatar: {
        width: 70,
        height: 70,
        borderRadius: 999,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheet__content: {
        marginTop: 20,
        borderBottomColor: '#DDDADA',
        borderBottomWidth: 0.5,
        paddingBottom: 20
    },
    bottomSheet__title: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617',
        textAlign: 'center'
    },
    bottomSheet__btn: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomSheet_IconWrapper: {
        width: 35,
        height: 35,
        borderRadius: 999,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheet__btnText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617'
    }
})

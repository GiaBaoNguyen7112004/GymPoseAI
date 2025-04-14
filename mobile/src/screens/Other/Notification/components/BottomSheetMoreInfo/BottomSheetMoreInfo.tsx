import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import MyIcon from '@/src/components/Icon'

function BottomSheetMoreInfo() {
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={BottomSheetBackdrop}
        >
            <BottomSheetView style={styles.bottomSheetContent}>
                <View style={styles.bottomSheet__avatar}>
                    <MyIcon name='AbWorkout' size={60} />
                </View>
                <View style={styles.bottomSheet__content}>
                    <Text style={styles.bottomSheet__title}>
                        {selectedNotification?.title || 'Notification Options'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.bottomSheet__btn} onPress={handleDeleteNotification}>
                    <View style={styles.bottomSheet_IconWrapper}>
                        <MyIcon name='closeSquareBold' size={20} />
                    </View>
                    <Text style={styles.bottomSheet__btnText}>Delete this notification</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default BottomSheetMoreInfo

const styles = StyleSheet.create({})

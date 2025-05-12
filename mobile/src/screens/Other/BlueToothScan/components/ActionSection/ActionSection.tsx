import { View, StyleSheet } from 'react-native'
import CameraButton from '../CameraButton'
import { memo } from 'react'

const ActionSection = ({ onPress }: { onPress: () => void }) => (
    <View style={styles.actionContainer}>
        <CameraButton onPress={onPress} />
    </View>
)

const styles = StyleSheet.create({
    actionContainer: {
        alignItems: 'center',
        marginTop: 20
    }
})

export default memo(ActionSection)

import { MainTabScreenProps } from '@/navigation/types'
import { StyleSheet, Text, View } from 'react-native'

const BlueToothScan = ({}: MainTabScreenProps<'BlueToothScan'>) => {
    return (
        <View>
            <Text>BlueTooth scan view</Text>
        </View>
    )
}
export default BlueToothScan

const styles = StyleSheet.create({})

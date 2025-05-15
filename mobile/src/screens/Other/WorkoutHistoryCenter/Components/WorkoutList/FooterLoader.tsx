import Loader from '@/components/Loader'
import { StyleSheet, View } from 'react-native'

const FooterLoader = () => (
    <View style={styles.footerLoader}>
        <Loader />
    </View>
)

export default FooterLoader
const styles = StyleSheet.create({
    footerLoader: {
        alignItems: 'center',
        paddingVertical: 12
    }
})

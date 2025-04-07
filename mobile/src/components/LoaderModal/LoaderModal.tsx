import { StyleSheet, Text, View } from 'react-native'
import Loader from '../Loader'

interface Props {
    title: string
}

function LoaderModal({ title }: Props) {
    return (
        <View style={styles.loadingWrapper}>
            <View style={styles.loading}>
                <Loader />
                <Text style={{ fontWeight: '500' }}>{title}...</Text>
            </View>
        </View>
    )
}

export default LoaderModal

const styles = StyleSheet.create({
    loadingWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99,
        inset: 0
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})

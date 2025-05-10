import LottieView from 'lottie-react-native'
import { StyleSheet, Text, View } from 'react-native'

const EmptyState = () => (
    <View style={styles.emptyContainer}>
        <LottieView source={require('@/assets/animations/stats.json')} autoPlay loop style={styles.emptyImage} />
        <Text style={styles.emptyText}>No workouts found.</Text>
    </View>
)

export default EmptyState

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    emptyText: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22
    },
    emptyImage: {
        width: 200,
        height: 200,
        opacity: 0.9
    }
})

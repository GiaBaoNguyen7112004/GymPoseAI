import NavigationBar from '@/components/NavigationBar'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'

function HeaderSection() {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <NavigationBar title='Connect Your Gear' headingStyle={styles.headerTitle} callback={navigation.goBack} />
            <Text style={styles.headerSubtitle}>Sync your camera to track your workout like a pro!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#1e293b',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    headerSubtitle: {
        marginTop: 9,
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        maxWidth: '80%'
    }
})

export default HeaderSection

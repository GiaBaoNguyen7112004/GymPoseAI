import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { RootStackScreenProps } from '@/navigation/types'
import { PRIVACY_SECTIONS } from '@/constants/privacy.constants'
import useScrollListener from '@/hooks/useScrollListener'

function PrivacyPolicyScreen({ navigation }: RootStackScreenProps<'PrivacyPolicy'>) {
    const { isScrolled, handleScroll } = useScrollListener()

    return (
        <View style={styles.safeArea}>
            <SafeAreaView style={[styles.header, isScrolled && styles.headerScrolled]}>
                <NavigationBar title='Privacy policy' callback={navigation.goBack} />
            </SafeAreaView>
            <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>
                <Text style={styles.title}>Privacy Policy</Text>

                {PRIVACY_SECTIONS.map((section, index) => (
                    <View key={index}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Text style={styles.paragraph}>{section.content}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        backgroundColor: '#FFF'
    },
    headerScrolled: {
        borderBottomColor: '#DDDADA'
    },
    container: {
        padding: 20,
        backgroundColor: '#FFF'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333'
    }
})

export default PrivacyPolicyScreen

import { Text, View, StyleSheet } from 'react-native'

const Header = () => (
    <View style={styles.callToAction}>
        <Text style={styles.callToAction__desc}>Hey there,</Text>
        <Text style={styles.callToAction__heading}>Create an Account</Text>
    </View>
)

const styles = StyleSheet.create({
    callToAction: {
        marginTop: 30,
        alignItems: 'center'
    },
    callToAction__heading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30
    },
    callToAction__desc: {
        color: '#1D1617',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24
    }
})

export default Header

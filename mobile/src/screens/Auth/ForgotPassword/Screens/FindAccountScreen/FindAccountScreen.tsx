import GradientButton from '@/src/components/GradientButton'
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

function FindAccountScreen({
    username,
    setUsername,
    usernameError,
    loading,
    _loadingDegAnimation,
    _checkExistUsername,
    _loadingDeg
}: {
    username: string
    setUsername: (text: string) => void
    usernameError: boolean
    loading: boolean
    _loadingDegAnimation: () => void
    _checkExistUsername: () => Promise<void>
    _loadingDeg: Animated.Value
}) {
    return (
        <View style={styles.centerContainer}>
            <View>
                <Text style={{ marginTop: 72, fontSize: 24, textAlign: 'center' }}>Find Your Account</Text>
                <Text style={{ marginVertical: 20, color: '#666', textAlign: 'center' }}>
                    Enter your FitnessX username or the email or phone number linked to account.
                </Text>
            </View>
            <View style={styles.formWrapper}>
                <View style={{ ...styles.inputWrapper, borderColor: usernameError ? 'red' : '#ddd' }}>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        autoFocus={true}
                        placeholder='Username, email '
                        autoCapitalize='none'
                        placeholderTextColor='#ADA4A5'
                        style={styles.input}
                    />
                </View>
                <GradientButton onPress={_checkExistUsername} activeOpacity={0.8} style={styles.btnNext} Square>
                    {!loading && <Text style={styles.btnText}>Next</Text>}
                    {loading && (
                        <>
                            <Animated.Image
                                onLayout={_loadingDegAnimation}
                                style={{
                                    ...styles.loadingIcon,
                                    position: 'absolute',
                                    transform: [
                                        {
                                            rotate: _loadingDeg.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg']
                                            })
                                        }
                                    ]
                                }}
                                source={require('@/src/assets/Icons/loading.png')}
                            />
                            <Text style={{ lineHeight: 24 }}> </Text>
                        </>
                    )}
                </GradientButton>
                <View style={styles.divideLine}>
                    <View style={styles.ORtextWrapper}>
                        <Text style={{ color: '#333', fontWeight: '600' }}>OR</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnLoginWithFacebook}>
                    <MyIcon name='logoX' color='#318bfb' size={15} />
                    <Text style={{ marginLeft: 10, fontWeight: '800', color: '#92A3FD' }}>Login with FitnessX</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FindAccountScreen

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnNext: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        marginBottom: 29,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    },
    inputWrapper: {
        width: '100%',
        height: 48,
        flexShrink: 0,
        paddingHorizontal: 9,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15
    },
    divideLine: {
        marginVertical: 10,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd'
    },
    ORtextWrapper: {
        width: 41,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH * 0.9 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    btnLoginWithFacebook: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    loadingIcon: {
        width: 25,
        height: 25
    }
})

import GradientButton from '@/src/components/GradientButton'
import TextGradient from '@/src/components/TextGradient'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native'

function VerificationScreen({
    loading,
    sendingReset,
    _loadingDegAnimation,
    _loadingDegAnimation2,
    code,
    inputRefs,
    handleCodeChange,
    handleKeyPress,
    handleFocus,
    _loadingDeg2 // Receive _loadingDeg2
}: {
    loading: boolean
    sendingReset: boolean
    _loadingDegAnimation: () => void
    _loadingDegAnimation2: () => void
    code: string[]
    inputRefs: React.RefObject<TextInput>[]
    handleCodeChange: (text: string, index: number) => void
    handleKeyPress: (event: { nativeEvent: { key: string } }, index: number) => void
    handleFocus: (index: number) => void
    _loadingDeg2: Animated.Value // Type _loadingDeg2
}) {
    return (
        <View style={styles.verifyScreenWrapper}>
            {sendingReset && (
                <Animated.Image
                    onLayout={_loadingDegAnimation2}
                    style={{
                        marginLeft: 10,
                        height: 24,
                        width: 24,
                        transform: [
                            {
                                rotate: _loadingDeg2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }
                        ]
                    }}
                    source={require('@/src/assets/Icons/waiting.png')}
                />
            )}
            <Text style={styles.titleVerify}>Enter Verification Code</Text>
            <View style={styles.formCodeWrapper}>
                {code.map((digit, i) => (
                    <View key={i} style={styles.inputRounded}>
                        <TextInput
                            ref={inputRefs[i]}
                            style={styles.input_code}
                            keyboardType='numeric'
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, i)}
                            onKeyPress={(event) => handleKeyPress(event, i)}
                            onFocus={() => handleFocus(i)}
                        />
                    </View>
                ))}
            </View>
            <Pressable style={styles.btnResent}>
                <Text style={styles.btnResentText}>If you didn’t receive a code,</Text>
                <TextGradient style={styles.strongText} text=' Resend' />
            </Pressable>
            <GradientButton activeOpacity={0.8} style={styles.btnNext} Square>
                {!loading && <Text style={styles.btnText}>Send</Text>}
                {loading && (
                    <>
                        <Animated.Image
                            onLayout={_loadingDegAnimation}
                            style={{
                                ...styles.loadingIcon,
                                position: 'absolute',
                                transform: [
                                    {
                                        rotate: _loadingDeg2.interpolate({
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
            <Text
                style={{
                    color: '#ABABAB',
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 58
                }}
            >
                Do you have an account?
            </Text>
            <TouchableOpacity style={styles.btnSignUpWrapper}>
                <Text style={styles.textInnerSignUp}>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default VerificationScreen
const styles = StyleSheet.create({
    verifyScreenWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    titleVerify: {
        marginTop: 72,
        color: '#444',
        fontSize: 16,
        fontWeight: '600'
    },
    formCodeWrapper: {
        marginTop: 26,
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        columnGap: 20,
        justifyContent: 'center'
    },
    inputRounded: {
        position: 'relative',
        display: 'flex',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#444'
    },
    input_code: {
        position: 'absolute',
        top: 12,
        width: 24,
        height: 30,
        color: '#444',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    btnResent: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnResentText: {
        color: '#ABABAB',
        fontSize: 14,
        fontWeight: '500'
    },
    strongText: {
        fontSize: 14,
        fontWeight: '500'
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
    btnSignUpWrapper: {
        marginTop: 18,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        height: 50,
        borderWidth: 1,
        borderColor: '#444'
    },
    textInnerSignUp: {
        color: '#8F8F8F',
        fontSize: 16,
        fontWeight: '600'
    },
    loadingIcon: {
        width: 25,
        height: 25
    }
})

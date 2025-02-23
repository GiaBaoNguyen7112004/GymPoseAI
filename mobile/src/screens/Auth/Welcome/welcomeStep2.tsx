import { StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/src/hooks/useThemeColor'
import { TextGradient } from '@/src/components/TextGradient'
import { CustomButton } from '@/src/components/GradientButton'
import { Typography } from '@/src/components/common/style-guide/typography'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeStep2() {
    const backgroundColor = useThemeColor({}, 'background') as string
    const textColor = useThemeColor({}, 'text') as string
    const navigation = useNavigation()

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.textWrapper}>
                <Text style={[styles.heading, { color: textColor }]}>Fitness</Text>
                <TextGradient text='X' style={styles.strongText} />
            </View>
            <Text style={[styles.desc, { color: textColor }]}>Everybody Can Train</Text>
            <CustomButton text outline>
                Get Started
            </CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        ...Typography.title.h1
    },
    desc: {
        ...Typography.text.subtitle
    },
    strongText: {
        fontSize: 50,
        fontFamily: 'Poppins_Bold'
    }
})

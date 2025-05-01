import { View, Text, StyleSheet } from 'react-native'
import { ReactNode } from 'react'

interface Props {
    title: string
    children: ReactNode
}

const SettingSection = ({ title, children }: Props) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
)

const styles = StyleSheet.create({
    section: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 2, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 8,
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#1D1617',
        marginBottom: 10
    }
})

export default SettingSection

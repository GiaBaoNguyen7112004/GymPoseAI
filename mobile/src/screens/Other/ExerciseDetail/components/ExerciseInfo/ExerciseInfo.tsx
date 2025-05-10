import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
    name: string
    duration: number
}

const ExerciseInfo = ({ name, duration }: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{duration} minutes</Text>
    </View>
)

export default memo(ExerciseInfo)

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1D1617',
        textTransform: 'capitalize'
    },
    subtitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72'
    }
})

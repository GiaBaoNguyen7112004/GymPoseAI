import { Skeleton } from 'moti/skeleton'
import { Dimensions, StyleSheet, View } from 'react-native'

const { width } = Dimensions.get('window')
const SKELETON_COUNT = 5

function CategorySkeletons() {
    return Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View key={index} style={styles.optionItem}>
            <Skeleton
                width={40}
                height={40}
                radius='round'
                colorMode='light'
                transition={{
                    type: 'timing',
                    duration: 1000
                }}
            />
            <View style={styles.textSpacing} />
            <Skeleton
                width={30}
                height={10}
                radius={4}
                colorMode='light'
                transition={{
                    type: 'timing',
                    duration: 1000
                }}
            />
        </View>
    ))
}

const styles = StyleSheet.create({
    optionItem: {
        alignItems: 'center',
        width: width / 3 - 10,
        marginBottom: 20
    },
    textSpacing: {
        height: 8,
        marginTop: 8
    }
})

export default CategorySkeletons

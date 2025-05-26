import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'

const width = Dimensions.get('window').width

interface CategoryOptionItemProps {
    name: string
    iconName: keyof typeof Ionicons.glyphMap
    isSelected: boolean
    onPress: () => void
}

const CategoryOptionItem = ({ name, iconName, isSelected, onPress }: CategoryOptionItemProps) => (
    <Pressable style={[styles.optionItem, isSelected && styles.optionItemSelected]} onPress={onPress}>
        <View style={styles.optionIconContainer}>
            <Ionicons name={iconName} size={28} color='#7B6F72' />
        </View>
        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{name}</Text>
    </Pressable>
)

const styles = StyleSheet.create({
    optionItem: {
        alignItems: 'center',
        width: width / 3 - 10,
        marginBottom: 20
    },
    optionItemSelected: {
        backgroundColor: '#9DCEFF',
        borderRadius: 8,
        padding: 4
    },
    optionText: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    },
    optionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    optionTextSelected: {
        color: '#fff',
        fontWeight: '600'
    }
})

export default memo(CategoryOptionItem)

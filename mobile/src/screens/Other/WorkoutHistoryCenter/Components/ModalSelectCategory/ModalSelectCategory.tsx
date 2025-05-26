import { Category } from '@/types/exercises.type'
import { getIconByIndex } from '@/utils/icon.util'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { memo, useCallback, useMemo } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import CategorySkeletons from './components/CategorySkeletons'
import CategoryOptionItem from './components/CategoryOptionItem'

const { width } = Dimensions.get('window')

interface ModalSelectCategoryProps {
    modalVisible: boolean
    onCloseModal: () => void
    selectedWorkout: string
    setSelectedWorkout: (workout: string | null, nameWorkout?: string) => void
    categoriesData: Category[]
    isLoading?: boolean
}

function ModalSelectCategory({
    categoriesData,
    modalVisible,
    selectedWorkout,
    onCloseModal,
    setSelectedWorkout,
    isLoading
}: ModalSelectCategoryProps) {
    const handleSelectWorkout = useCallback(
        (id: string | null, name?: string) => () => {
            setSelectedWorkout(id, name)
        },
        [setSelectedWorkout]
    )

    const renderedOptions = useMemo(() => {
        return categoriesData.map((option, index) => {
            const isSelected = option.id === selectedWorkout
            return (
                <CategoryOptionItem
                    key={option.id}
                    iconName={getIconByIndex(index + 1)}
                    isSelected={isSelected}
                    name={option.name}
                    onPress={handleSelectWorkout(option.id, option.name)}
                />
            )
        })
    }, [categoriesData, handleSelectWorkout, selectedWorkout])
    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={onCloseModal}
            onBackButtonPress={onCloseModal}
            animationIn='slideInDown'
            animationOut='slideOutUp'
            animationInTiming={400}
            animationOutTiming={400}
            useNativeDriverForBackdrop
            hideModalContentWhileAnimating
        >
            <BlurView intensity={0} tint='dark' style={styles.dimOverlay}>
                <SafeAreaView style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View style={styles.spacer} />
                        <Text style={styles.modalTitle}>{selectedWorkout}</Text>
                        <Pressable onPress={onCloseModal}>
                            <Ionicons name='close' size={28} color='white' />
                        </Pressable>
                    </View>

                    <View style={styles.optionsContainer}>
                        {isLoading ? (
                            <CategorySkeletons />
                        ) : (
                            <>
                                <Pressable style={styles.optionItem} onPress={handleSelectWorkout(null)}>
                                    <View style={styles.optionIconContainer}>
                                        <Ionicons name={getIconByIndex(0)} size={28} color='#7B6F72' />
                                    </View>
                                    <Text style={styles.optionText}>All workout</Text>
                                </Pressable>
                                {renderedOptions}
                            </>
                        )}
                    </View>
                </SafeAreaView>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    blurView: {
        flex: 1,
        zIndex: 1000
    },

    dimOverlay: {
        flex: 1
    },

    modalContent: {
        flex: 1
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40
    },
    spacer: {
        width: 28
    },
    modalTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: 'white'
    },

    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: width * 0.3
    },

    optionItem: {
        alignItems: 'center',
        width: width / 3 - 10,
        marginBottom: 20
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

    optionText: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    }
})

export default memo(ModalSelectCategory)

import { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { FlowProps } from '../../PersonalDataFlow'
import { ImageEditor, ImageData } from 'expo-crop-image'
import GradientButton from '@/components/GradientButton'

export default function PreviewAvatarScreen({ onGoBack }: FlowProps) {
    const [imageUri, setImageUri] = useState<string | null>(null)
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission denied to access photos')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 })
        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri)
        }
    }

    const handleEditImage = () => {
        if (!imageUri) {
            openImagePicker()
        } else {
            setIsEditorOpen(true)
        }
    }

    const handleSaveAvatar = () => {
        if (imageUri) {
            console.log('Avatar saved:', imageUri)
            const formData = new FormData()
            // Append avatar data if needed
        }
    }

    const handleImageEditComplete = (data: ImageData) => {
        setIsEditorOpen(false)
        setImageUri(data.uri)
    }

    useEffect(() => {
        if (!imageUri) {
            openImagePicker()
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.bockTop}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
                            <Ionicons name='chevron-back' size={24} color='black' />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Preview</Text>
                    </View>

                    <View style={styles.previewContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.placeholder]}>
                                <Text style={styles.placeholderText}>No image selected</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditImage}>
                        <Ionicons name='crop-outline' size={20} color='black' />
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bockBottom}>
                    <GradientButton style={styles.saveButton} Square onPress={handleSaveAvatar}>
                        <Text style={styles.saveText}>Save</Text>
                    </GradientButton>
                </View>
            </View>

            <ImageEditor
                isVisible={isEditorOpen}
                imageUri={imageUri!}
                onEditingCancel={() => setIsEditorOpen(false)}
                onEditingComplete={handleImageEditComplete}
            />
        </View>
    )
}

const avatarSize = 300
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bockTop: {
        flex: 1,
        paddingHorizontal: 20
    },
    bockBottom: {
        borderTopWidth: 1,
        borderTopColor: '#DDDADA',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'flex-start',
        paddingVertical: 16
    },
    backButton: {},
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1D1617'
    },
    previewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    placeholder: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholderText: {
        color: '#888'
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    editText: {
        marginLeft: 8,
        fontSize: 16
    },
    saveButton: {
        marginTop: 20
    },
    saveText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    }
})

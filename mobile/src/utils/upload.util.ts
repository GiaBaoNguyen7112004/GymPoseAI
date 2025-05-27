import { uploadApi } from '@/services/rest'
import showToast from './toast.util'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

export async function uploadImageFromUri(uri: string): Promise<string | null> {
    try {
        const fileName = uri.split('/').pop() || 'image.jpg'
        const fileType = fileName.split('.').pop()

        // Fetch the image as blob to check its size
        const fetchResponse = await fetch(uri)
        const blob = await fetchResponse.blob()

        // Check file size
        if (blob.size > MAX_FILE_SIZE) {
            throw new Error('Image size must not exceed 10MB')
        }

        const formData = new FormData()
        const imageFile = {
            uri,
            name: fileName,
            type: `image/${fileType}`
        } as unknown as Blob

        formData.append('image', imageFile)

        const uploadResponse = await uploadApi.uploadImage(formData)
        return uploadResponse.data?.data?.image || null
    } catch (err) {
        if (err instanceof Error && err.message === 'Image size must not exceed 10MB') {
            showToast({
                title: 'Image size must not exceed 10MB',
                position: 'top'
            })
        } else {
            console.error('Upload failed:', err)
            showToast({
                title: 'Failed to upload image',
                position: 'top'
            })
        }
        return null
    }
}

import { uploadApi } from '@/services/rest'

export async function uploadImageFromUri(uri: string): Promise<string | null> {
    try {
        const fileName = uri.split('/').pop() || 'image.jpg'
        const fileType = fileName.split('.').pop()

        const formData = new FormData()
        const imageFile = {
            uri,
            name: fileName,
            type: `image/${fileType}`
        } as unknown as Blob

        formData.append('image', imageFile)

        const response = await uploadApi.uploadImage(formData)
        return response.data?.data?.image || null
    } catch (err) {
        console.error('Upload failed:', err)
        return null
    }
}

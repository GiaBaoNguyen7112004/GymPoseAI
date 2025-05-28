import React from 'react'
import { View, Text, Image, StyleSheet, Platform } from 'react-native'
import { formatTimeWithSeconds } from '@/utils/format.util'
import { pose_error } from '@/types/workoutHistory.type'

interface PoseErrorViewProps {
    poseError: pose_error
}

const InfoRow = ({ label, value }: { label: string; value: string | number | undefined }) => {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
                {value ?? 'N/A'}
            </Text>
        </View>
    )
}

const PoseErrorView: React.FC<PoseErrorViewProps> = ({ poseError }) => {
    return (
        <View style={styles.screenContainer}>
            <Image
                source={{ uri: poseError.image_url }}
                style={styles.image}
                resizeMode='cover'
                defaultSource={require('@/assets/images/placeHolder.jpg')}
            />
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Pose Error Details</Text>
                <InfoRow label='Error ID' value={poseError.id} />
                <InfoRow label='AI Result' value={poseError.ai_result} />
                <InfoRow label='Timestamp' value={formatTimeWithSeconds(poseError.created_at)} />
                <InfoRow label='Repetition' value={poseError.rep_index} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 44 : 32
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#F3F4F6'
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
        color: '#111827',
        marginBottom: 12
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
    },
    infoLabel: {
        fontSize: 14,
        color: '#7B6F72',
        fontWeight: '500'
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1D1617',
        width: '60%'
    }
})

export default PoseErrorView
